<script lang="ts">
	import Chatbot from '$lib/components/Chatbot.svelte';
	import ChevronBarContract from '$lib/icons/ChevronBarContract.svelte';
	import ChevronBarExpand from '$lib/icons/ChevronBarExpand.svelte';
	import { t } from '$lib/i18n';
	import WarningIcon from '$lib/icons/WarningIcon.svelte';
	import UploadIcon from '$lib/icons/UploadIcon.svelte';

	// Ensure Bootstrap CSS is linked in your project (e.g., in app.html or imported globally)
	// For example, in your src/app.html:
	//

	const MAX_FILE_SIZE_MB = 100;
	const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

	let selectedFile = $state<File | null>(null);
	let errorMessage = $state<string | null>(null);
	let uploadResponse = $state<string | null>(null);
	let isLoading = $state<boolean>(false);
	let fileInputKey = $state(0); // Used to reset the file input

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		errorMessage = null;
		uploadResponse = null;

		if (file) {
			if (file.type !== 'application/pdf') {
				errorMessage = 'Invalid file type. Please select a PDF.';
				return;
			}

			if (file.size > MAX_FILE_SIZE_BYTES) {
				errorMessage = `File exceeds ${MAX_FILE_SIZE_MB}MB limit. Please select a smaller file. Size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
				return;
			}

			selectedFile = file;
		}
	}

	async function handleUpload() {
		if (!selectedFile) {
			errorMessage = 'Please select a file to upload.';
			return;
		}

		isLoading = true;
		errorMessage = null;
		uploadResponse = null;

		const formData = new FormData();
		formData.append('pdfFile', selectedFile); // Key 'pdfFile' should match server-side expectation

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			const resultText = (await response.json()).text; // Read text regardless of status first

			if (!response.ok) {
				throw new Error(resultText || `Upload failed with status: ${response.status}`);
			}

			uploadResponse = resultText;
		} catch (err) {
			if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = 'An unknown error occurred during upload.';
			}
			console.error('Upload error:', err);
		} finally {
			isLoading = false;
			collapsedPdf = true;

			const collapseElement = document.getElementById('pdf-collapse');
			if (collapseElement) {
				collapseElement.classList.remove('show');
			}
		}
	}

	let collapsedPdf = $state(false);
</script>

<div class="container mt-5 mb-5">
	<div class="card shadow-sm">
		<div class="card-header bg-light">
			<h2 class="h4 mb-0">{$t('pdf-uploader')}</h2>
			<button
				class="btn btn-primary"
				type="button"
				data-toggle="collapse"
				data-target="#pdf-collapse"
				aria-label="Toggle PDF Upload"
				aria-expanded="true"
				aria-controls="pdf-collapse"
				onclick={() => {
					const collapseElement = document.getElementById('pdf-collapse');
					if (collapseElement) {
						collapseElement.classList.toggle('show');
						collapsedPdf = !collapsedPdf;
					}
				}}
			>
				{#if collapsedPdf}
					<ChevronBarExpand />
					{$t('expand')}
				{:else}
					<ChevronBarContract />
					{$t('collapse')}
				{/if}
			</button>
		</div>
		<div class="card-body collapse show" id="pdf-collapse">
			<p class="card-text text-muted">
				{$t('pdf-select')} (max {MAX_FILE_SIZE_MB}MB) {$t('pdf-preview')}
			</p>

			<div class="mb-3">
				<label for="pdfUpload" class="form-label fw-bold">{$t('pdf-choose')}</label>
				{#key fileInputKey}
					<input
						type="file"
						class="form-control"
						id="pdfUpload"
						accept="application/pdf"
						onchange={handleFileChange}
					/>
				{/key}
			</div>

			{#if errorMessage}
				<div class="alert alert-danger d-flex align-items-center" role="alert">
					<WarningIcon />
					<div>
						<strong>{$t('generic-error')}:</strong>
						{errorMessage}
					</div>
				</div>
			{:else}
				<div class="row mt-4">
					<div class="col-md-7">
						{#if selectedFile}
							<div class="text-center p-5 border rounded">
								<p class="text-muted">
									{$t('pdf-selected')}
								</p>
							</div>
						{:else}
							<div class="text-center p-5 border rounded bg-light">
								<p class="text-muted display-6">🖼️</p>
								<p class="text-muted">{$t('pdf-preview-text')}</p>
							</div>
						{/if}
					</div>
					<div class="col-md-5">
						{#if uploadResponse}
							<div class="mt-md-0">
								<h5 class="mb-2">{$t('server-response')} :</h5>
								<div
									class="alert alert-success p-3"
									role="alert"
									style="height: 100%; max-height: 15em; overflow-y: auto;"
								>
									<pre
										class="mb-0"
										style="white-space: pre-wrap; word-wrap: break-word;">{uploadResponse}</pre>
								</div>
							</div>
						{/if}

						{#if selectedFile}
							<div class="mt-4 d-grid">
								<button class="btn btn-primary btn-lg" onclick={handleUpload}>
									<UploadIcon />
									{$t('chatbot.uploadPdf')}
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
		<div class="card-footer text-muted small">{$t('context-provider')}</div>
	</div>

	{#if uploadResponse}
		<div class="card shadow-sm" style="margin-top: 3rem">
			<div class="card-header bg-light">
				<h2 class="h4 mb-0">{$t('chat')}</h2>
			</div>
			<div class="card-body">
				<Chatbot context={uploadResponse} />
			</div>
			<div class="card-footer text-muted small">{$t('context-provider')}</div>
		</div>
	{/if}
</div>

<style>
	.alert pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid #dee2e6;
		background-color: #f8f9fa;
		color: #212529;
	}
</style>
