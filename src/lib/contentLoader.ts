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