#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import content data (simulating import since we're in Node.js)
const contentData = {
  projects: [
    {
      title: "Project Title One",
      url: "/projects#project-1",
      type: "project",
      excerpt: "A compelling description of what this project accomplishes, the problems it solves, and the impact it has made.",
      metadata: "Technology • Year"
    },
    {
      title: "Research Project", 
      url: "/projects#project-2",
      type: "project",
      excerpt: "An exploration into a fascinating area of study that led to new insights and potential applications.",
      metadata: "Research • Year"
    },
    {
      title: "Creative Work",
      url: "/projects#project-3", 
      type: "project",
      excerpt: "A creative endeavor that explores the intersection of technology, art, and human expression.",
      metadata: "Art • Year"
    },
    {
      title: "Open Source Tool",
      url: "/projects#project-4",
      type: "project", 
      excerpt: "A tool built to solve a common problem, shared with the community to benefit others facing similar challenges.",
      metadata: "Software • Year"
    }
  ],
  blogPosts: [
    {
      title: "Building Modern Web Applications",
      url: "/blog#post-1",
      type: "blog",
      excerpt: "Thoughts on the current state of web development and emerging trends that are shaping the future of digital experiences.",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      title: "The Art of Minimalist Design", 
      url: "/blog#post-2",
      type: "blog",
      excerpt: "Why less is often more in digital design, and how minimalism can enhance user experience and functionality.",
      date: "2024-01-10", 
      readTime: "3 min read"
    },
    {
      title: "Reflections on Technology",
      url: "/blog#post-3",
      type: "blog", 
      excerpt: "Exploring the intersection between technology and life in an increasingly digital world.",
      date: "2024-01-05",
      readTime: "7 min read"
    }
  ],
  readings: [
    {
      title: "Example Paper Title",
      url: "/readings#reading-1",
      type: "reading",
      excerpt: "A brief description or key insight from this reading that caught your attention and influenced your thinking.",
      metadata: "Author Name • Journal • Year"
    },
    {
      title: "Another Interesting Article",
      url: "/readings#reading-2", 
      type: "reading",
      excerpt: "Another insightful piece that contributed to your understanding of a particular topic or field of study.",
      metadata: "Author Name • Publication • Year"
    }
  ]
};

// Flatten all content
const allContent = [...contentData.projects, ...contentData.blogPosts, ...contentData.readings];

function extractFileId(url) {
  // Extract the fragment identifier (everything after #)
  const parts = url.split('#');
  return parts.length > 1 ? parts[1] : null;
}

function getExpectedFilePath(contentItem) {
  const fileId = extractFileId(contentItem.url);
  if (!fileId) return null;
  
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  
  // Determine subfolder based on content type
  let subfolder;
  switch (contentItem.type) {
    case 'project':
      subfolder = 'projects';
      break;
    case 'blog':
      subfolder = 'posts';
      break;
    case 'reading':
      subfolder = 'readings';
      break;
    default:
      subfolder = 'misc';
  }
  
  return path.join(contentDir, subfolder, `${fileId}.md`);
}

function testContentFilesExist() {
  let passed = 0;
  let failed = 0;
  const failures = [];

  console.log('🧪 Testing content file existence...\n');

  for (const item of allContent) {
    const expectedPath = getExpectedFilePath(item);
    
    if (!expectedPath) {
      console.log(`❌ ${item.title}: Invalid URL format (${item.url})`);
      failed++;
      failures.push({
        title: item.title,
        url: item.url,
        reason: 'Invalid URL format - no fragment identifier found'
      });
      continue;
    }

    if (fs.existsSync(expectedPath)) {
      console.log(`✅ ${item.title}: File exists (${path.basename(expectedPath)})`);
      passed++;
    } else {
      console.log(`❌ ${item.title}: File missing (${expectedPath})`);
      failed++;
      failures.push({
        title: item.title,
        url: item.url,
        expectedPath,
        reason: 'File does not exist'
      });
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    console.log('❌ Failed tests:');
    failures.forEach(failure => {
      console.log(`   • ${failure.title}: ${failure.reason}`);
      if (failure.expectedPath) {
        console.log(`     Expected: ${failure.expectedPath}`);
      }
    });
    console.log('\n💡 Run this script with --create-missing to generate placeholder files.');
    process.exit(1);
  } else {
    console.log('🎉 All content files exist!');
    process.exit(0);
  }
}

function createMissingFiles() {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  
  // Create content directory and subfolders if they don't exist
  const subfolders = ['projects', 'posts', 'readings'];
  
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log(`📁 Created content directory: ${contentDir}`);
  }
  
  subfolders.forEach(subfolder => {
    const subfolderPath = path.join(contentDir, subfolder);
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath, { recursive: true });
      console.log(`📁 Created subfolder: ${subfolder}`);
    }
  });

  console.log('🔧 Creating missing content files...\n');

  for (const item of allContent) {
    const expectedPath = getExpectedFilePath(item);
    
    if (!expectedPath) continue;

    if (!fs.existsSync(expectedPath)) {
      const content = `# ${item.title}

${item.excerpt}

${item.metadata || item.date || ''}

---

*This is a placeholder file. Please replace this content with the actual article.*

## Content Coming Soon

This article is currently in development. Check back soon for the full content.

### Metadata
- Type: ${item.type}
- URL: ${item.url}
${item.date ? `- Date: ${item.date}` : ''}
${item.readTime ? `- Read time: ${item.readTime}` : ''}
${item.metadata ? `- Info: ${item.metadata}` : ''}
`;

      fs.writeFileSync(expectedPath, content);
      console.log(`✅ Created: ${path.basename(expectedPath)}`);
    } else {
      console.log(`⏭️  Skipped: ${path.basename(expectedPath)} (already exists)`);
    }
  }

  console.log('\n🎉 Done creating placeholder files!');
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--create-missing')) {
  createMissingFiles();
} else {
  testContentFilesExist();
}