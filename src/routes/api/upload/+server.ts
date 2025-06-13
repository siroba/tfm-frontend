import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import CanvasKitInit from 'canvaskit-wasm/bin/canvaskit.js';
// @ts-expect-error scribe does not export default
import scribe from 'scribe.js-ocr';

export const POST: RequestHandler = async ({ request }) => {
	const { origin } = new URL(request.url);

	// CanvasKitInit is local, but will fetch the .wasm via HTTP:
	const CanvasKit = await CanvasKitInit({
		locateFile: (file) => `${origin}/wasm/${file}`
	});

	await scribe.init({
		ocr: true,
		font: true,
		CanvasKit
	});

	try {
		const formData = await request.formData();
		const uploadedFile = formData.get('pdfFile');

		// 1. Validate uploaded file
		if (!(uploadedFile instanceof File)) {
			return json({ error: 'No file uploaded or invalid form data.' }, { status: 400 });
		}

		if (uploadedFile.type !== 'application/pdf') {
			return json({ error: 'Invalid file type. Only PDF files are accepted.' }, { status: 400 });
		}

		const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB limit
		if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
			return json(
				{ error: `File size exceeds the limit of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` },
				{ status: 400 }
			);
		}

		// 2. Determine OCR Language
		const requestedLang = ((formData.get('language') as string) || '').toLowerCase() as
			| 'eng'
			| 'spa'
			| 'eus'
			| '';
		const supportedLangs = ['eng', 'spa', 'eus']; // English (eng), Spanish (spa), Basque (eus)
		let ocrLang = requestedLang || 'spa'; // Default to Spanish

		if (requestedLang && supportedLangs.includes(requestedLang.toLowerCase())) {
			ocrLang = requestedLang;
		}

		// 3. Perform OCR
		console.log(`Attempting OCR with language: ${ocrLang}`);

		const ocrResult = await scribe.extractText([uploadedFile], ocrLang);

		const extractedText: string = typeof ocrResult === 'string' ? ocrResult : ocrResult?.text;

		// 4. Return successful response
		return json(
			{
				text: extractedText.replaceAll('....', ''),
				language: ocrLang,
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
