// Content loader utility for dynamically importing markdown files

export const loadMarkdownContent = async (type: string, slug: string): Promise<string> => {
  // Map 'blog' type to the 'posts' folder for backwards-compatibility
  let folderName = type;
  if (type === "blog") folderName = "posts";

  // Use Vite's glob import to eager-load all markdown files as raw strings.
  // This allows us to safely look up any file at runtime while still enabling
  // the bundler to include them in the build output.
  const modules = import.meta.glob("../content/**/*.md", { as: "raw" });

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

// Interface for content list items
export interface ContentListItem {
  slug: string;
  title: string;
  description: string;
  metadata: string;
  date?: string;
  readTime?: string;
  links?: {
    github_link?: string;
    huggingface_link?: string;
    webpage_link?: string;
    [key: string]: string | undefined;
  };
}

// Enhanced function to extract metadata including links for projects
export const parseEnhancedMetadata = (content: string, slug: string): ContentListItem => {
  const lines = content.split('\n');
  const title = lines[0]?.replace(/^#\s*/, '').trim() || '';
  const description = lines[2]?.trim() || '';
  const metadata = lines[4]?.trim() || '';

  // Find the metadata section for extracting links and additional info
  const metadataStartIndex = lines.findIndex(line => line.trim() === '### Metadata');
  const links: ContentListItem['links'] = {};
  let date: string | undefined;
  let readTime: string | undefined;

  if (metadataStartIndex > -1) {
    const metadataLines = lines.slice(metadataStartIndex + 1);
    
    for (const line of metadataLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('- ')) {
        const metaLine = trimmedLine.substring(2);
        
        // Parse date
        if (metaLine.startsWith('Date: ')) {
          date = metaLine.substring(6);
        }
        
        // Parse read time
        if (metaLine.startsWith('Read time: ')) {
          readTime = metaLine.substring(11);
        }
        
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

  return {
    slug,
    title,
    description,
    metadata,
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

  // Use Vite's glob import to eager-load all markdown files as raw strings
  const modules = import.meta.glob("../content/**/*.md", { as: "raw" });
  
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