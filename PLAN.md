# Personal Site — Plan

## Goal

A personal site where I post life updates and interesting things (knowledge, reflections, reading notes), with a CV page that introduces me. The CV is also available as a PDF.

## Priorities

- Quick to get online
- Easy to maintain: a new post = one new Markdown file, no server or database
- The CV web page has one source of truth (`cv.yaml`); the PDF is written by hand, so I keep the two in sync myself

## Tech

- **Framework:** Astro (start from the official `blog` template)
- **Language:** English site (menus, labels, URLs). No i18n routing.
- **Content:** Markdown files in `src/content/blog/`
- **CV data:** `src/data/cv.yaml`
- **Hosting:** GitHub Pages, repo named `<username>.github.io` (free, auto-deploys on every push via the official Astro GitHub Action)

## Content model

Every post is one Markdown file in `src/content/blog/` with this frontmatter:

```yaml
---
title: "Post title"
description: "One-line summary"
pubDate: 2026-11-19
category: life     # life | knowledge | reflection | reading
lang: zh-TW        # optional: only for posts written mainly in Chinese (default: en)
---
```

- **life**: life updates
- **knowledge**: things I learned, tutorials
- **reflection**: thoughts, essays
- **reading**: book or article notes
- **lang**: sets the post page's `<html lang>` so browsers pick the right font and search engines know the language. Menus stay in English.

## CV (web page + PDF)

- CV content is in `src/data/cv.yaml` (name, summary, education, experience, skills, projects, contact links)
- The `/about` page is generated from that file
- The PDF is a separate document I write myself, saved as `public/cv.pdf`
- The CV page has a "View CV (PDF)" button that opens the PDF in a new tab
- When I update the CV: edit the YAML, check the page, update my PDF to match, commit both

## Pages (MVP)

1. **Home** (`/`): short intro (name + one or two lines), the 5 latest posts, links to the other pages
2. **Posts** (`/blog`): all posts, newest first, each showing its category label
3. **Post page** (`/blog/[slug]`): title, date, category, content
4. **Category pages** (`/category/[name]`): posts filtered by category
5. **About / CV** (`/about`): generated from the CV data file, with a "View CV (PDF)" button

## Build order (one step at a time: run it, check it, commit it)

1. Create the Astro blog template project and run it locally
2. Put my name, site title and intro text in place of the template's placeholders
3. Add `category` and optional `lang` to the content schema; show the category on posts; use `lang` for the page's `<html lang>`
4. Add the category pages
5. Build the CV page from `cv.yaml`
6. Add a "View CV (PDF)" button and put my own PDF at `public/cv.pdf`
7. Write 2–3 real posts (replace the sample posts)
8. Push to GitHub, add the GitHub Pages deploy workflow, get a live URL
9. Simple styling pass: fonts (including a Chinese font fallback), colors, spacing

## Not now (later ideas)

- Tags, search, RSS tweaks
- Dark mode
- Comments
- Analytics
- Custom domain
- Full bilingual site (Chinese menus, `/zh-tw/` URLs, Chinese CV)
