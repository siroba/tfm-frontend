import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: 'src/routes/api/upload/ocr',
					dest: 'bin' // This will copy to .svelte-kit/output/ bin
				}
			]
		}),
		{
			name: 'make-binary-executable',
			closeBundle() {
				const binPath = path.resolve('/var/task/.svelte-kit/output/bin/ocr'); // Adjust if needed
				try {
					fs.chmodSync(binPath, 0o755); // rwxr-xr-x
					console.log(`Set executable permissions on: ${binPath}`);
				} catch (err) {
					console.warn(`Failed to set executable permission: ${err.message}`);
				}
			}
		}
	],
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
		}
	}
});
