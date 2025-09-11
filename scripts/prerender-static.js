// Simple prerender that duplicates built index.html for each blog route
// and injects per-post SEO tags into the head, including og:image.
// Purpose: make direct URLs like /blog/<slug> work on static hosting
// while providing correct <title>, descriptions, canonicals, and OG/Twitter tags.

import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const ORIGIN = 'https://m-ric.com';

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return {};
  const endIdx = raw.indexOf('\n---');
  if (endIdx === -1) return {};
  const head = raw.slice(3, endIdx).trim();
  const fm = {};
  for (const line of head.split('\n')) {
    const i = line.indexOf(':');
    if (i > -1) {
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim();
      fm[key] = value;
    }
  }
  return fm;
}

function extractMainContent(raw) {
  if (!raw.startsWith('---')) return raw;
  const endIdx = raw.indexOf('\n---');
  if (endIdx === -1) return raw;
  return raw.slice(endIdx + 4).trim();
}

function firstImageFromMarkdown(raw) {
  const content = extractMainContent(raw);
  // Candidates: custom figure-card data-src, <img src>, Markdown image syntax
  const patterns = [
    /data-src=\"([^\"]+\.(?:png|jpe?g|webp|gif))\"/i,
    /<img[^>]*src=\"([^\"]+\.(?:png|jpe?g|webp|gif))\"[^>]*>/i,
    /!\[[^\]]*\]\(([^\)]+\.(?:png|jpe?g|webp|gif))\)/i,
  ];
  for (const re of patterns) {
    const m = content.match(re);
    if (m && m[1]) return m[1];
  }
  return null;
}

function toAbsoluteUrl(u) {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return ORIGIN + u;
  return ORIGIN + '/' + u.replace(/^\.\//, '');
}

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/\"/g, '&quot;');
}

function replaceOrInsert(html, regex, tag) {
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function injectSeo(indexHtml, { title, description, url, image }) {
  let html = indexHtml;

  // Title
  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escAttr(title)} – Aymeric Roucher<\/title>`);
  }

  // Description
  if (description) {
    const descTag = `<meta name=\"description\" content=\"${escAttr(description)}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*name=[\"']description[\"'][^>]*>/i, descTag);
  }

  // Canonical and og:url
  if (url) {
    const canonicalTag = `<link rel=\"canonical\" href=\"${url}\" />`;
    html = replaceOrInsert(html, /<link[^>]*rel=[\"']canonical[\"'][^>]*>/i, canonicalTag);

    const ogUrlTag = `<meta property=\"og:url\" content=\"${url}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*property=[\"']og:url[\"'][^>]*>/i, ogUrlTag);
  }

  // Open Graph title/description and type
  if (title) {
    const ogTitleTag = `<meta property=\"og:title\" content=\"${escAttr(title)}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*property=[\"']og:title[\"'][^>]*>/i, ogTitleTag);
  }
  if (description) {
    const ogDescTag = `<meta property=\"og:description\" content=\"${escAttr(description)}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*property=[\"']og:description[\"'][^>]*>/i, ogDescTag);
  }
  // If there's an og:type, set to article for blog posts; otherwise insert it
  const ogTypeTag = `<meta property=\"og:type\" content=\"article\" />`;
  html = replaceOrInsert(html, /<meta[^>]*property=[\"']og:type[\"'][^>]*>/i, ogTypeTag);

  // Twitter title/description
  if (title) {
    const twTitleTag = `<meta name=\"twitter:title\" content=\"${escAttr(title)}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*name=[\"']twitter:title[\"'][^>]*>/i, twTitleTag);
  }
  if (description) {
    const twDescTag = `<meta name=\"twitter:description\" content=\"${escAttr(description)}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*name=[\"']twitter:description[\"'][^>]*>/i, twDescTag);
  }

  // Image (Open Graph + Twitter)
  if (image) {
    const ogImgTag = `<meta property=\"og:image\" content=\"${image}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*property=[\"']og:image[\"'][^>]*>/i, ogImgTag);
    const twImgTag = `<meta name=\"twitter:image\" content=\"${image}\" />`;
    html = replaceOrInsert(html, /<meta[^>]*name=[\"']twitter:image[\"'][^>]*>/i, twImgTag);
    const twCardTag = `<meta name=\"twitter:card\" content=\"summary_large_image\" />`;
    html = replaceOrInsert(html, /<meta[^>]*name=[\"']twitter:card[\"'][^>]*>/i, twCardTag);
  }

  return html;
}

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
    const mdPath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(mdPath, 'utf8');
    const fm = parseFrontmatter(raw);
    const title = fm.title || slug;
    const description = fm.thumbnail || fm.description || `Blog post: ${title}`;
    const url = `${ORIGIN}/blog/${slug}`;
    let image = null;
    if (fm.image) image = toAbsoluteUrl(fm.image);
    if (!image) image = toAbsoluteUrl(firstImageFromMarkdown(raw));

    const html = injectSeo(indexHtml, { title, description, url, image });
    const outDir = path.join(DIST_DIR, 'blog', slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
    console.log(`[prerender] Wrote ${path.join('dist', 'blog', slug, 'index.html')}`);
  }
}

main().catch(err => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});

