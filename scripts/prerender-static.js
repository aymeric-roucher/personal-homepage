// Simple prerender that duplicates built index.html for each blog route.
// No SSR and no head changes: pages are identical to SPA navigation.
// Purpose: make direct URLs like /blog/<slug> work on static hosting.

import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');

async function main() {
  // Ensure dist exists and index.html is available
  await fs.access(INDEX_HTML_PATH);
  const indexHtml = await fs.readFile(INDEX_HTML_PATH, 'utf8');

  let files;
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    console.warn(`[prerender] No posts directory at ${POSTS_DIR}; skipping.`);
    return;
  }

  const postFiles = files.filter(f => f.endsWith('.md'));
  if (postFiles.length === 0) {
    console.warn('[prerender] No markdown posts found; nothing to generate.');
    return;
  }

  for (const file of postFiles) {
    const slug = file.replace(/\.md$/, '');
    const outDir = path.join(DIST_DIR, 'blog', slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), indexHtml, 'utf8');
    console.log(`[prerender] Wrote ${path.join('dist', 'blog', slug, 'index.html')}`);
  }
}

main().catch(err => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});

