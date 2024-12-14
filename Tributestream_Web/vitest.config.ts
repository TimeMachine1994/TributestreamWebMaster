// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
    alias: [
      {find: '$lib', replacement: path.resolve('./src/lib')},
      {find: '$mocks', replacement: path.resolve('./src/mocks')}
    ]
	}
});