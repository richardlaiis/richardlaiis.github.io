// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://richardlaiis.github.io',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Roboto is Material Design's typeface. Astro downloads it at build time
			// and serves it from this site (no request to Google from visitors).
			provider: fontProviders.google(),
			name: 'Roboto',
			cssVariable: '--font-body',
			weights: [400, 500, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			// Roboto has no Chinese characters, so Chinese text falls back to the
			// reader's system Chinese font (macOS/iOS, Android/Linux, Windows).
			fallbacks: ['PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', 'sans-serif'],
		},
	],
});
