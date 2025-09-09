// Centralized content data for search and page consistency

export interface ContentItem {
  title: string;
  url: string;
  type: 'project' | 'blog';
  excerpt: string;
  metadata?: string;
  date?: string;
  readTime?: string;
}

// Projects data - matches actual Projects page content
export const projects: ContentItem[] = [
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
];

// Blog posts data - matches actual Blog page content
export const blogPosts: ContentItem[] = [
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
];

// Combined content for search
export const allContent: ContentItem[] = [
  ...projects,
  ...blogPosts
];