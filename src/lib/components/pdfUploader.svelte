<script lang="ts">
	let pdfFile: File | null = $state(null);
	let pdfUrl: string | null = $state(null);
	let { sessionId = $bindable() }: { sessionId: string | null } = $props();

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file && file.type === 'application/pdf') {
			pdfFile = file;
			pdfUrl = URL.createObjectURL(file);
		} else {
			pdfFile = null;
			pdfUrl = null;
			alert('Por favor, selecciona un archivo PDF válido.');
		}
	}

	async function uploadPdf() {
		if (!pdfFile) return;

		const formData = new FormData();
		formData.append('pdf', pdfFile);

		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			alert('Archivo subido con éxito.');
		} else {
			alert('Error al subir el archivo.');
		}
	}
</script>

<div class="container mt-4">
	<h3 class="mb-3">Subir y Visualizar PDF</h3>

	<div class="mb-3">
		<input type="file" class="form-control" accept="application/pdf" onchange={handleFileChange} />
	</div>

	{#if pdfUrl}
		<div class="mt-4">
			<h5>Vista previa del PDF:</h5>
			<iframe src={pdfUrl} width="100%" height="600px" class="border"></iframe>
		</div>
		<button class="btn btn-primary mt-3" onclick={uploadPdf}>Subir PDF al servidor</button>
	{/if}
</div>
