// scripts/generate-sitemap.ts
import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

const DOMAIN = 'https://m-ric.com';

interface SitemapEntry {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
}

async function getLastModified(filePath: string): Promise<string> {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    // Look for date in the markdown (line 5 based on your format)
    const dateLine = lines[4]?.trim();
    if (dateLine && /^\d{4}-\d{2}-\d{2}$/.test(dateLine)) {
        return dateLine;
    }

    // Fallback to current date
    return new Date().toISOString().split('T')[0];
}

async function generateSitemap() {
    const entries: SitemapEntry[] = [];

    // Add static pages
    entries.push(
        { loc: '/', changefreq: 'weekly', priority: 1.0 },
        { loc: '/transformers_viz_claude', changefreq: 'monthly', priority: 0.9 },
        { loc: '/blog', changefreq: 'monthly', priority: 0.9 },
        { loc: '/projects', changefreq: 'monthly', priority: 0.8 }
    );

    // Find all markdown files
    const markdownFiles = await glob('src/content/**/*.md');

    for (const file of markdownFiles) {
        const relativePath = path.relative('src/content', file);
        const [type, filename] = relativePath.split(path.sep);
        const slug = filename.replace('.md', '');

        // Map 'posts' folder to 'blog' route
        const routeType = type === 'posts' ? 'blog' : type;
        const url = `/${routeType}/${slug}`;

        // Skip readings content entirely
        if (type === 'readings' || routeType === 'readings') {
            continue;
        }

        const lastmod = await getLastModified(file);

        // Set priority based on content type
        let priority = 0.6;
        let changefreq = 'weekly';

        if (type === 'posts' || type === 'blog') {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (type === 'projects') {
            priority = 0.7;
            changefreq = 'weekly';
        }

        entries.push({
            loc: url,
            lastmod,
            changefreq,
            priority
        });
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${DOMAIN}${entry.loc}</loc>${entry.lastmod ? `
    <lastmod>${entry.lastmod}</lastmod>` : ''}${entry.changefreq ? `
    <changefreq>${entry.changefreq}</changefreq>` : ''}${entry.priority !== undefined ? `
    <priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    // Write to public directory
    await writeFile('public/sitemap.xml', xml, 'utf-8');
    console.log(`✅ Generated sitemap.xml with ${entries.length} URLs`);

    // Also generate a simple text sitemap for easier reading
    const textSitemap = entries.map(e => `${DOMAIN}${e.loc}`).join('\n');
    await writeFile('public/sitemap.txt', textSitemap, 'utf-8');
    console.log('✅ Generated sitemap.txt');
}

// Run the script
generateSitemap().catch(console.error);
