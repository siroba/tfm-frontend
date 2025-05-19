<script lang="ts">
	import ChatStream from '$lib/components/chatStream.svelte';
	import PdfUploader from '$lib/components/pdfUploader.svelte';
	let sessionId: string | null = $state(null);
</script>

<PdfUploader bind:sessionId />
{#if sessionId}
	<ChatStream bind:sessionId />
{/if}
