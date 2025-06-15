<script lang="ts">
	import '../app.scss';
	import { t, locale, locales } from '$lib/i18n';
	import storage from '$lib/store';
	import type { Locales } from '$lib/translations';

	let { children } = $props();
	export const lang_sub = storage<{ lang: Locales }>('lang', { lang: 'es' });
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="d-flex align-items-center">
		<h1 class="fw-bold fs-2 mb-0 me-2">DocuChat</h1>
		<span class="badge bg-light bg-opacity-25 text-dark">BETA</span>
	</div>

	<select
		class="form-select language-selection"
		aria-label="Language selection"
		bind:value={$locale}
		onchange={() => lang_sub.update(() => ({ lang: $locale }))}
		style="cursor: pointer;"
	>
		{#each locales as l (l)}
			<option value={l}>{$t(l)}</option>
		{/each}
	</select>
</nav>

<main>
	{@render children()}
</main>

<footer class="text-center py-4">
	<p class="text-white-75 mb-0">Masters Project 2024 - Silvia Rodríguez Bares</p>
</footer>

<style>
	.language-selection {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 1000;
		width: fit-content;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	main {
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100vh;
		background-color: #f8f9fa;
		color: #343a40;
	}

	h2 {
		animation: fadeInDown 1s ease-in-out;
	}
</style>
