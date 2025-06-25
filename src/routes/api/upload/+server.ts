import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const uploadedFile = formData.get('pdfFile');

		// Validate uploaded file
		if (!(uploadedFile instanceof File)) {
			return json({ error: 'No file uploaded or invalid form data.' }, { status: 400 });
		}

		if (uploadedFile.type !== 'application/pdf') {
			return json({ error: 'Invalid file type. Only PDF files are accepted.' }, { status: 400 });
		}

		const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;
		if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
			return json(
				{ error: `File size exceeds the limit of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` },
				{ status: 400 }
			);
		}

		// Save uploaded file to a temp path
		const tempFilePath = path.join(os.tmpdir(), `${randomUUID()}.pdf`);
		await writeFile(tempFilePath, Buffer.from(await uploadedFile.arrayBuffer()));

		// Run the ./ocr binary
		const extractedText = await new Promise<string>((resolve, reject) => {
			const proc = spawn('./ocr');

			let output = '';
			let errorOutput = '';

			proc.stdout.on('data', (data) => (output += data.toString()));
			proc.stderr.on('data', (data) => (errorOutput += data.toString()));

			proc.on('error', reject);

			proc.on('close', (code) => {
				unlink(tempFilePath).catch(() => {}); // Cleanup

				if (code === 0) {
					resolve(output);
				} else {
					reject(new Error(`OCR failed with code ${code}: ${errorOutput}`));
				}
			});

			// Pipe the PDF file into the process
			import('fs').then((fs) => {
				const readStream = fs.createReadStream(tempFilePath);
				readStream.pipe(proc.stdin!);
			});
		});

		// Return response
		return json(
			{
				text: extractedText.replaceAll('....', ''),
				language: 'n/a', // Language not used here
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
