<script lang="ts">
	let pdfFile: File | null = $state(null);
	let pdfPreviewUrl: string | null = $state(null);
	let { sessionId = $bindable() }: { sessionId: string | null } = $props();

	let isUploading = $state(false);
	let statusMessages: string[] = $state([]);
	let uploadError: string = $state('');

	let currentProgressPage = $state(0);
	let totalProgressPages = $state(0);
	let progressPercentage = $state(0);

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file && file.type === 'application/pdf') {
			pdfFile = file;
			if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
			pdfPreviewUrl = URL.createObjectURL(file);

			// Reset states for new file
			uploadError = '';
			statusMessages = [];
			sessionId = null;
			currentProgressPage = 0;
			totalProgressPages = 0;
			progressPercentage = 0;
		} else {
			pdfFile = null;
			if (pdfPreviewUrl) {
				URL.revokeObjectURL(pdfPreviewUrl);
				pdfPreviewUrl = null;
			}
			alert('Please select a valid PDF file.');
		}
	}

	async function uploadPdf() {
		if (!pdfFile) return;

		isUploading = true;
		statusMessages = [];
		sessionId = null;
		uploadError = '';
		currentProgressPage = 0;
		totalProgressPages = 0;
		progressPercentage = 0;

		const formData = new FormData();
		formData.append('file', pdfFile);

		try {
			const response = await fetch('http://localhost:8000/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok || !response.body) {
				const errorText = await response.text();
				uploadError = `Error uploading PDF: ${response.status} ${response.statusText}. ${errorText || ''}`;
				statusMessages = [...statusMessages, uploadError];
				isUploading = false;
				return;
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });

				let events = chunk
					.replaceAll('\n', '')
					.replaceAll("'", '"')
					.split('data: ')
					.filter((txt) => txt.trim() !== '');

				events.forEach((event) => {
					try {
						const jsonStr = event.trim();
						const parsed = JSON.parse(jsonStr);

						const eventType = parsed.type;
						const eventData = parsed.data;

						if (eventType === 'eta') {
							const timeInSeconds = parseFloat(eventData);
							const minutes = Math.floor(timeInSeconds / 60);
							const seconds = Math.round(timeInSeconds % 60);
							statusMessages = [
								...statusMessages,
								`Estimated processing time: ${minutes}m ${seconds}s`
							];
						} else if (eventType === 'status') {
							statusMessages = [...statusMessages, eventData];
						} else if (eventType === 'page_progress') {
							const [current, total] = eventData.split('/').map(Number);
							currentProgressPage = current;
							totalProgressPages = total;
							if (total > 0) {
								progressPercentage = parseFloat(((current / total) * 100).toFixed(1));
							}
							const lastMsgIndex = statusMessages.findIndex((msg) =>
								msg.startsWith('Processing page')
							);
							const progressMsg = `Processing page ${current} of ${total} (${progressPercentage}%)`;
							if (lastMsgIndex !== -1) {
								const newMessages = [...statusMessages];
								newMessages[lastMsgIndex] = progressMsg;
								statusMessages = newMessages;
							} else {
								statusMessages = [...statusMessages, progressMsg];
							}
						} else if (eventType === 'done') {
							statusMessages = [...statusMessages, 'Processing complete. Session ready.'];
							sessionId = eventData;
							isUploading = false;
						} else if (eventType === 'error') {
							uploadError = `Server error: ${eventData}`;
							statusMessages = [...statusMessages, uploadError];
							isUploading = false;
							reader.cancel();
							return;
						}
					} catch (jsonErr) {
						console.error('Failed to parse SSE JSON:', jsonErr);
					}
				});
			}
		} catch (err) {
			console.error('Upload failed:', err);
			uploadError = `Upload failed: ${err instanceof Error ? err.message : String(err)}`;
			statusMessages = [...statusMessages, uploadError];
		} finally {
			isUploading = false;
			if (
				!sessionId &&
				!uploadError &&
				totalProgressPages > 0 &&
				currentProgressPage !== totalProgressPages
			) {
				statusMessages = [
					...statusMessages,
					'Upload process finished, but completion status unclear.'
				];
			}
		}
	}

	$effect(() => {
		const currentUrl = pdfPreviewUrl;
		return () => {
			if (currentUrl) URL.revokeObjectURL(currentUrl);
		};
	});
</script>

<div class="container mt-4">
	<h3 class="mb-3">Upload and Process PDF</h3>

	<div class="mb-3">
		<label for="pdfUploadInput" class="form-label">Select PDF file:</label>
		<input
			id="pdfUploadInput"
			type="file"
			class="form-control"
			accept="application/pdf"
			onchange={handleFileChange}
			disabled={isUploading}
		/>
	</div>

	{#if pdfPreviewUrl}
		<div class="mt-4">
			<h5>PDF Preview:</h5>
			<iframe title="PDF preview" src={pdfPreviewUrl} width="100%" height="500px" class="border"
			></iframe>
		</div>

		<button class="btn btn-primary mt-3" onclick={uploadPdf} disabled={isUploading || !pdfFile}>
			{#if isUploading}
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Processing PDF...
			{:else}
				Upload & Process PDF
			{/if}
		</button>
	{/if}

	{#if isUploading || statusMessages.length > 0}
		<div class="mt-4">
			<h5>Processing Status:</h5>
			{#if isUploading}
				<div class="progress mt-2 mb-2" style="height: 25px;">
					<div
						class="progress-bar"
						role="progressbar"
						style="width: {progressPercentage}%;"
						aria-valuenow={progressPercentage}
						aria-valuemin="0"
						aria-valuemax="100"
					>
						{currentProgressPage} / {totalProgressPages} pages ({progressPercentage}%)
					</div>
				</div>
			{/if}
			<ul class="list-group">
				{#each statusMessages as msg, i (i)}
					<li class="list-group-item">{msg}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if uploadError}
		<div class="alert alert-danger mt-3">
			<strong>Error:</strong>
			{uploadError}
		</div>
	{/if}

	{#if sessionId && !isUploading && !uploadError}
		<div class="alert alert-success mt-3">
			Session ID generated: <code>{sessionId}</code>
		</div>
	{/if}
</div>

<style>
	/* Basic Bootstrap-like styles for demonstration */
	.container {
		max-width: 960px;
		margin-inline: auto;
		padding: 1rem;
	}
	.mt-4 {
		margin-top: 1.5rem;
	}
	.mb-3 {
		margin-bottom: 1rem;
	}
	.mt-3 {
		margin-top: 1rem;
	}
	.mt-2 {
		margin-top: 0.5rem;
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.form-label {
		margin-bottom: 0.5rem;
		display: inline-block;
	}
	.form-control {
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
	}
	.btn {
		display: inline-block;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		user-select: none;
		border: 1px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
	}
	.btn-primary {
		color: #fff;
		background-color: #0d6efd;
		border-color: #0d6efd;
	}
	.btn:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}
	.alert {
		position: relative;
		padding: 1rem 1rem;
		margin-bottom: 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
	}
	.alert-success {
		color: #0f5132;
		background-color: #d1e7dd;
		border-color: #badbcc;
	}
	.alert-danger {
		color: #842029;
		background-color: #f8d7da;
		border-color: #f5c2c7;
	}
	.list-group {
		display: flex;
		flex-direction: column;
		padding-left: 0;
		margin-bottom: 0;
	}
	.list-group-item {
		position: relative;
		display: block;
		padding: 0.5rem 1rem;
		color: #212529;
		text-decoration: none;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.125);
	}
	.list-group-item:first-child {
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}
	.list-group-item:last-child {
		border-bottom-right-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.spinner-border-sm {
		width: 1rem;
		height: 1rem;
		border-width: 0.2em;
	}
	.spinner-border {
		display: inline-block;
		width: 1em;
		height: 1em;
		vertical-align: -0.125em;
		border: 0.2em solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: 0.75s linear infinite spinner-border;
	}
	@keyframes spinner-border {
		to {
			transform: rotate(360deg);
		}
	}
	.progress {
		display: flex;
		height: 1rem;
		overflow: hidden;
		font-size: 0.75rem;
		background-color: #e9ecef;
		border-radius: 0.25rem;
	}
	.progress-bar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		color: #fff;
		text-align: center;
		white-space: nowrap;
		background-color: #0d6efd;
		transition: width 0.6s ease;
	}
</style>
