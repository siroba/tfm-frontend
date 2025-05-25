<script lang="ts">
	import { onDestroy } from 'svelte';
	let history: string[] = $state([]);
	let message = $state('');
	let partialResponse = $state('');
	let isLoading = $state(false);
	let { sessionId = $bindable() }: { sessionId: string | null } = $props();

	async function sendMessage() {
		if (!message.trim() || !sessionId) return;

		isLoading = true;

		const formData = new FormData();
		formData.append('session_id', sessionId);
		formData.append('message', message);

		try {
			const res = await fetch('http://localhost:8000/chat', {
				method: 'POST',
				body: formData
			});

			const reader = res.body?.getReader();
			const decoder = new TextDecoder('utf-8');

			if (!reader) {
				alert('No se pudo leer el stream');
				isLoading = false;
				return;
			}

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				let events = chunk
					.replaceAll('data: ', '')
					.replaceAll("'", '"')
					.replaceAll('\\"', "'")
					.replaceAll("\\'", "'")
					.split('\n\n')
					.filter((txt) => txt.trim() !== '');

				events.forEach((event) => {
					try {
						const jsonStr = event.trim();
						const parsed = JSON.parse(jsonStr);

						const eventType = parsed.type;
						const eventData = parsed.data;

						console.log(eventType);

						if (eventType === 'error') {
							history = [...history, eventData];
							isLoading = false;
							return;
						} else if (eventType === 'message') {
							partialResponse += eventData;
							console.log(partialResponse);
						}
					} catch (jsonErr) {
						console.error('Failed to parse SSE JSON:', jsonErr);
					}
				});
			}
		} catch (err) {
			console.error('Chat stream error:', err);
			alert('Falló el envío del mensaje.');
		} finally {
			isLoading = false;
			history.push(partialResponse);
			partialResponse = '';
		}
	}

	onDestroy(() => {
		// No need to close anything manually here
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
			{#if partialResponse}
				{partialResponse}
			{:else if isLoading}
				<span class="text-muted">Cargando respuesta...</span>
			{:else if history.length > 0}
				{#each history as message, index (index)}
					<p>{message}</p>
				{/each}
			{:else}
				<span class="text-muted">Aún no hay respuesta.</span>
			{/if}
		</div>
	</div>
</div>
