// Content loader utility for dynamically importing markdown files

export const loadMarkdownContent = async (type: string, slug: string): Promise<string> => {
  // Map 'blog' type to the 'posts' folder for backwards-compatibility
  let folderName = type;
  if (type === "blog") folderName = "posts";

  // Use Vite's glob import to lazy-load individual markdown files as raw strings.
  // This allows us to load content on-demand without bloating the initial bundle.
  const modules = import.meta.glob("../content/**/*.md", { query: "?raw", import: "default" });

  const key = `../content/${folderName}/${slug}.md`;
  const loader = modules[key] as undefined | (() => Promise<string>);

  if (!loader) {
    console.error(`Markdown not found for key: ${key}`);
    throw new Error(`Content not found: ${type}/${slug}`);
  }

  // Each loader returns the raw markdown string
  const rawMarkdown = await loader();
  return rawMarkdown as unknown as string;
};

// Helper function to calculate read time based on word count
export const calculateReadTime = (content: string): string => {
  // Average reading speed is about 200-250 words per minute
  // We'll use 225 words per minute as a middle ground
  const wordsPerMinute = 225;
  
  // Remove markdown syntax and count words
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/[*_~`]/g, '') // Remove markdown formatting
    .replace(/---[\s\S]*?---/g, '') // Remove frontmatter
    .replace(/\n/g, ' '); // Replace newlines with spaces
  
  const wordCount = cleanContent.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readTimeMinutes} min read`;
};

// Helper function to extract metadata from markdown content
export const parseMarkdownMetadata = (content: string) => {
  const lines = content.split('\n');
  const title = lines[0]?.replace('#', '').trim() || '';
  const description = lines[2]?.trim() || '';
  const metadata = lines[4]?.trim() || '';

  // Find content after the --- separator
  const separatorIndex = lines.findIndex(line => line.trim() === '---');
  const mainContent = separatorIndex > -1
    ? lines.slice(separatorIndex + 1).join('\n').trim()
    : content;

  return {
    title,
    description,
    metadata,
    content: mainContent
  };
};

// Helper function to parse frontmatter and content
export const parseFrontmatter = (content: string) => {
  const lines = content.split('\n');
  
  // Check if content starts with frontmatter
  if (lines[0]?.trim() !== '---') {
    return {
      frontmatter: {},
      content: content
    };
  }
  
  // Find the closing --- separator
  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  
  if (closingIndex === -1) {
    return {
      frontmatter: {},
      content: content
    };
  }
  
  // Parse frontmatter
  const frontmatterLines = lines.slice(1, closingIndex);
  const frontmatter: Record<string, string> = {};
  
  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }
  
  // Get content after frontmatter
  const mainContent = lines.slice(closingIndex + 1).join('\n').trim();
  
  return {
    frontmatter,
    content: mainContent
  };
};

// Helper function to parse content for display on content pages
export const parseContentForDisplay = (content: string) => {
  const { frontmatter, content: mainContent } = parseFrontmatter(content);
  
  return {
    title: frontmatter.title || '',
    date: frontmatter.date || '',
    content: mainContent
  };
};

// Interface for content list items
export interface ContentListItem {
  slug: string;
  title: string;
  description: string;
  metadata: string;
  date?: string;
  readTime?: string;
  links?: {
    link?: string;
    image?: string;
    background?: string;
    github_link?: string;
    huggingface_link?: string;
    webpage_link?: string;
    [key: string]: string | undefined;
  };
}

// Enhanced function to extract metadata including links for projects
export const parseEnhancedMetadata = (content: string, slug: string): ContentListItem => {
  const { frontmatter, content: mainContent } = parseFrontmatter(content);
  
  // Extract data from frontmatter or fallback to old parsing method
  let title = frontmatter.title || '';
  let description = frontmatter.thumbnail || '';
  let date = frontmatter.date || '';
  
  // If no frontmatter, try old format
  if (!title) {
    const lines = content.split('\n');
    title = lines[0]?.replace(/^#\s*/, '').trim() || '';
    description = lines[2]?.trim() || '';
    
    // Find metadata section for old format
    const metadataStartIndex = lines.findIndex(line => line.trim() === '### Metadata');
    if (metadataStartIndex > -1) {
      const metadataLines = lines.slice(metadataStartIndex + 1);
      for (const line of metadataLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('- Date: ')) {
          date = trimmedLine.substring(8);
        }
      }
    }
  }

  // Parse links from frontmatter first, then fallback to old metadata section
  const links: ContentListItem['links'] = {};
  
  // Extract links from frontmatter
  const linkFields = ['link', 'image', 'background', 'github_link', 'huggingface_link', 'webpage_link'];
  for (const field of linkFields) {
    if (frontmatter[field]) {
      links[field as keyof NonNullable<ContentListItem['links']>] = frontmatter[field];
    }
  }
  
  // Fallback: Parse links from old metadata section format (for backward compatibility)
  if (Object.keys(links).length === 0) {
    const lines = content.split('\n');
    const metadataStartIndex = lines.findIndex(line => line.trim() === '### Metadata');
    
    if (metadataStartIndex > -1) {
      const metadataLines = lines.slice(metadataStartIndex + 1);
      
      for (const line of metadataLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('- ')) {
          const metaLine = trimmedLine.substring(2);
          
          // Parse links
          const linkPrefixes = ['github_link:', 'huggingface_link:', 'webpage_link:'];
          for (const prefix of linkPrefixes) {
            if (metaLine.startsWith(prefix)) {
              const linkKey = prefix.replace(':', '') as keyof NonNullable<ContentListItem['links']>;
              links[linkKey] = metaLine.substring(prefix.length).trim();
            }
          }
        }
      }
    }
  }

  // Calculate read time dynamically
  const readTime = calculateReadTime(content);

  return {
    slug,
    title,
    description,
    metadata: date, // Keep metadata for backward compatibility
    date,
    readTime,
    links: Object.keys(links).length > 0 ? links : undefined
  };
};

// Function to load all content items for a given type
export const loadContentList = async (type: string): Promise<ContentListItem[]> => {
  // Map 'blog' type to the 'posts' folder for backwards-compatibility
  let folderName = type;
  if (type === "blog") folderName = "posts";

  // Use Vite's glob import to lazy-load all markdown files as raw strings
  const modules = import.meta.glob("../content/**/*.md", { query: "?raw", import: "default" });
  
  // Filter modules for the specific content type
  const typeModules = Object.entries(modules).filter(([path]) => 
    path.includes(`/${folderName}/`)
  );

  const contentItems: ContentListItem[] = [];

  for (const [path, loader] of typeModules) {
    try {
      const content = await loader();
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      const item = parseEnhancedMetadata(content as string, slug);
      contentItems.push(item);
    } catch (error) {
      console.error(`Error loading content from ${path}:`, error);
    }
  }

  // Sort by date if available (newest first), otherwise by title
  return contentItems.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
};