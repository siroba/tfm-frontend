<script lang="ts">
	import Chatbot from '$lib/components/Chatbot.svelte';
	import ChevronBarContract from '$lib/icons/ChevronBarContract.svelte';
	import ChevronBarExpand from '$lib/icons/ChevronBarExpand.svelte';
	import { lang_sub, t } from '$lib/i18n';
	import WarningIcon from '$lib/icons/WarningIcon.svelte';
	import UploadIcon from '$lib/icons/UploadIcon.svelte';

	let language = $state('es');
	lang_sub.subscribe((value) => {
		language = value.lang;
	});

	const MAX_FILE_SIZE_MB = 100;
	const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

	let selectedFile = $state<File | null>(null);
	let previewUrl = $state<string | null>(null);
	let errorMessage = $state<string | null>(null);
	let uploadResponse = $state<string | null>(null);
	let isLoading = $state<boolean>(false);
	let fileInputElement: HTMLInputElement;

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		// Reset states
		selectedFile = null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl); // Clean up old object URL immediately
		}
		previewUrl = null;
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
			previewUrl = URL.createObjectURL(file);
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
		formData.append('pdfFile', selectedFile);
		formData.append('language', language);

		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
		// Simulate a delay to show loading state
		await sleep(500);

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

			// const collapseElement = document.getElementById('pdf-collapse');
			// if (collapseElement) {
			// 	collapseElement.classList.remove('show');
			// }
		} catch (err) {
			if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = 'An unknown error occurred during upload.';
			}
			console.error('Upload error:', err);
		} finally {
			isLoading = false;
		}
	}

	let collapsedPdf = $state(false);
</script>

<div class="container mt-5 mb-5">
	<div class="card shadow-sm glass-effect animated-slide-up mb-4 border-0">
		<div class="gradient-header d-flex justify-content-between align-items-center rounded-top">
			<h2 class="h4 mb-0">{$t('pdf-uploader')}</h2>
			<button
				class="btn btn-light text-primary fw-bold"
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
			<p class="text-muted mb-4 text-center">
				{$t('pdf-select')} (max {MAX_FILE_SIZE_MB}MB) {$t('pdf-preview')}
			</p>

			<!-- Drop Zone -->
			<div
				class="drop-zone border border-2 border-dashed rounded-4 p-5 text-center mb-4 animated-fade-in"
			>
				<div class="fs-1 text-muted mb-3">
					<div class="upload-icon-wrapper text-muted">
						<UploadIcon />
					</div>
				</div>
				<p class="fw-bold text-secondary">
					{$t('drag-pdf')}
					<span class="text-primary" role="button" onclick={() => fileInputElement?.click()}>
						{$t('pdf-choose')}
					</span>
				</p>
				<p class="text-muted">{$t('max-size')} {MAX_FILE_SIZE_MB}MB</p>

				<input
					bind:this={fileInputElement}
					type="file"
					id="pdfUpload"
					accept="application/pdf"
					class="d-none"
					onchange={handleFileChange}
				/>
			</div>
			{#if errorMessage}
				<div class="alert alert-danger d-flex align-items-center animated-fade-in" role="alert">
					<WarningIcon />
					<div>
						<strong>{$t('generic.error')}:</strong>
						{errorMessage}
					</div>
				</div>
			{:else}
				<div class="row mt-4">
					<div class="col-md-7">
						{#if previewUrl}
							<div class="preview-container">
								<h5 class="mb-2">{$t('chatbot.preview')}</h5>
								<embed src={previewUrl} type="application/pdf" width="100%" height="600px" />
							</div>
						{:else if selectedFile}
							<div class="text-center p-5 border rounded">
								<p class="text-muted">
									{$t('pdf-selected')}
								</p>
							</div>
						{/if}
					</div>
					<div class="col-md-5">
						{#if uploadResponse}
							<div class="mt-md-0">
								<h5 class="mb-2">{$t('server.response')} :</h5>
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
						{:else if isLoading}
							<div class="text-center">
								<div class="spinner-border" role="status">
									<span class="visually-hidden">{$t('loading')}</span>
								</div>
								<p class="mt-2">{$t('loading')}</p>
							</div>
						{/if}

						{#if selectedFile}
							<div class="mt-4 d-grid">
								<button class="btn btn-primary btn-lg" onclick={handleUpload} disabled={isLoading}>
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
		<div class="card shadow-lg glass-effect mt-5 border-0 animated-slide-up">
			<div class="gradient-header rounded-top">
				<h2 class="h5 mb-0">{$t('chat')}</h2>
			</div>
			<div class="card-body">
				<Chatbot context={uploadResponse} />
			</div>
			<div class="card-footer text-muted small">{$t('context-provider')}</div>
		</div>
	{/if}
</div>

<style>
	.preview-container embed {
		border: 1px solid #dee2e6; /* Bootstrap's default border color */
		border-radius: 0.25rem; /* Bootstrap's default border radius */
	}
	/* Ensure preformatted text in success message wraps */
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

	.drop-zone {
		transition: border 0.3s ease;
	}
	.drop-zone:hover {
		background-color: #f8f9fa;
		cursor: pointer;
	}

	.upload-icon-xl {
		width: 48px;
		height: 48px;
	}
</style>
