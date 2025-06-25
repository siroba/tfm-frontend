import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: 'src/routes/api/upload/ocr',
					dest: 'server/entries/endpoints/api/upload' // This will copy to .svelte-kit/output/server/entries/endpoints/api/upload
				}
			]
		})
	],
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
		}
	}
});
