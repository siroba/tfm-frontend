<script lang="ts">
	import { onDestroy } from 'svelte';
	let message = $state('');
	let response = $state('');
	let isLoading = $state(false);
	let { sessionId = $bindable() }: { sessionId: string | null } = $props();

	let eventSource: EventSource | null = $state(null);

	async function sendMessage() {
		if (!message.trim()) return;
		if (!sessionId) return;

		response = '';
		isLoading = true;

		const formData = new FormData();
		formData.append('session_id', sessionId);
		formData.append('message', message);

		const res = await fetch('/chat_stream', {
			method: 'POST',
			body: formData
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder('utf-8');

		if (!reader) {
			alert('Error al leer el stream');
			isLoading = false;
			return;
		}

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			const chunk = decoder.decode(value, { stream: true });

			// Procesar SSE
			for (const line of chunk.split('\n')) {
				if (line.startsWith('data:')) {
					const data = line.replace('data:', '').trim();
					if (data === '[DONE]') {
						isLoading = false;
						break;
					}
					response += data;
				}
			}
		}

		message = '';
		isLoading = false;
	}

	onDestroy(() => {
		eventSource!.close();
	});
</script>

<div class="container mt-4">
	<h3 class="mb-3">Asistente</h3>

	<div class="mb-3">
		<textarea
			class="form-control"
			rows="3"
			placeholder="Escribe tu mensaje..."
			bind:value={message}
			disabled={isLoading}
		></textarea>
	</div>

	<button class="btn btn-primary" onclick={sendMessage} disabled={isLoading}>
		{#if isLoading}
			Enviando...
		{:else}
			Enviar
		{/if}
	</button>

	<div class="mt-4">
		<h5>Respuesta:</h5>
		<div class="border rounded p-3" style="white-space: pre-wrap; background-color: #f8f9fa;">
			{#if response}
				{response}
			{:else if isLoading}
				<span class="text-muted">Cargando respuesta...</span>
			{:else}
				<span class="text-muted">Aún no hay respuesta.</span>
			{/if}
		</div>
	</div>
</div>
