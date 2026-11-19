import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';
import { CATEGORIES } from './consts';

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
			category: z.enum(CATEGORIES),
			// Main language of the post. Leave it out for English posts.
			lang: z.enum(['en', 'zh-TW']).default('en'),
		}),
});

// A date like "2023" or "Sep 2023" or "Present". coerce turns a bare 2023 into text.
const cvDate = z.coerce.string();

const cv = defineCollection({
	// Read src/data/cv.yaml as one entry with the id "cv".
	loader: file('src/data/cv.yaml', { parser: (text) => ({ cv: parseYaml(text) }) }),
	schema: z.object({
		name: z.string(),
		headline: z.string().optional(),
		summary: z.string(),
		contact: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
		education: z
			.array(
				z.object({
					school: z.string(),
					degree: z.string(),
					location: z.string().optional(),
					start: cvDate,
					end: cvDate.optional(),
					details: z.array(z.string()).default([]),
				}),
			)
			.default([]),
		experience: z
			.array(
				z.object({
					title: z.string(),
					org: z.string(),
					location: z.string().optional(),
					start: cvDate,
					end: cvDate.optional(),
					details: z.array(z.string()).default([]),
				}),
			)
			.default([]),
		projects: z
			.array(
				z.object({
					name: z.string(),
					url: z.string().optional(),
					description: z.string(),
				}),
			)
			.default([]),
		skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })).default([]),
	}),
});

export const collections = { blog, cv };
