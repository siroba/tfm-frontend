import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'url';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const uploadedFile = formData.get('pdfFile');

		if (!(uploadedFile instanceof File)) {
			return json({ error: 'No file uploaded or invalid form data.' }, { status: 400 });
		}

		const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;
		if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
			return json(
				{ error: `File size exceeds the limit of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` },
				{ status: 400 }
			);
		}

		// Log current directory info
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const cwd = process.cwd();

		console.log('Request received');
		console.log('import.meta.url:', import.meta.url);
		console.log('__dirname:', __dirname);
		console.log('process.cwd():', cwd);

		const binaryPath = path.join(process.cwd(), '.svelte-kit/output/bin/ocr');
		console.log('Resolved binaryPath:', binaryPath);

		const tempFilePath = path.join(os.tmpdir(), `${randomUUID()}.pdf`);
		await writeFile(tempFilePath, Buffer.from(await uploadedFile.arrayBuffer()));
		console.log('Temp file written:', tempFilePath);

		const extractedText = await new Promise<string>((resolve, reject) => {
			const proc = spawn(binaryPath);

			let output = '';
			let errorOutput = '';

			proc.stdout.on('data', (data) => (output += data.toString()));
			proc.stderr.on('data', (data) => (errorOutput += data.toString()));

			proc.on('error', (err) => {
				console.error('Spawn error:', err);
				reject(err);
			});

			proc.on('close', (code) => {
				console.log('Process exited with code:', code);
				console.log('OCR output:', output);
				console.log('OCR stderr:', errorOutput);
				unlink(tempFilePath).catch(() => {});
				if (code === 0) {
					resolve(output);
				} else {
					reject(new Error(`OCR failed with code ${code}: ${errorOutput}`));
				}
			});

			import('fs').then((fs) => {
				fs.createReadStream(tempFilePath).pipe(proc.stdin!);
			});
		});

		return json(
			{
				text: extractedText.replaceAll('....', ''),
				language: 'n/a',
				fileName: uploadedFile.name,
				fileSize: uploadedFile.size
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('API Error in /api/upload:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred during PDF processing.';
		return json({ error: 'Failed to process PDF.', details: errorMessage }, { status: 500 });
	}
};
