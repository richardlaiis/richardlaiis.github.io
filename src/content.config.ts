import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Which kind of post this is. Must be one of these four words.
			category: z.enum(['life', 'knowledge', 'reflection', 'reading']),
			// Main language of the post. Leave it out for English posts.
			lang: z.enum(['en', 'zh-TW']).default('en'),
		}),
});

export const collections = { blog };
