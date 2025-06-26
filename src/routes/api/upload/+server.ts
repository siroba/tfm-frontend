import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ocr } from 'rs-ocr';

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

		const extractedText = ocr(Buffer.from(await uploadedFile.arrayBuffer()));

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
