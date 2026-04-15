import { Input } from "@/components/ui/input";
import { loadContentList, type ContentListItem, loadMarkdownContent, parseContentForDisplay } from "@/lib/contentLoader";
import { Code, FileText, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchItems, setSearchItems] = useState<Array<{ title: string; excerpt: string; url: string; type: "project" | "blog"; content?: string }>>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredItems = searchItems.filter(item => {
    const q = searchQuery.toLowerCase();
    if (!q) return false;
    return (
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      (item.type === "blog" && (item.content || "").toLowerCase().includes(q))
    );
  });

  const handleSelect = (url: string) => {
    setShowDropdown(false);
    setSearchQuery("");
    // Open external links in a new tab, internal with router
    if (/^https?:\/\//i.test(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project": return <Code className="h-4 w-4" />;
      case "blog": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load real content from markdown for search (projects + blog)
  useEffect(() => {
    let isMounted = true;
    const loadAll = async () => {
      try {
        const [projects, posts] = await Promise.all([
          loadContentList("projects"),
          loadContentList("blog"), // maps to posts folder internally
        ]);

        if (!isMounted) return;

        const mapProject = (p: ContentListItem) => ({
          title: p.title,
          excerpt: p.description || "",
          url: p.links?.link || "#",
          type: "project" as const,
        });

        // Load full blog content to enable content-based search + snippet
        const postItems = await Promise.all(posts.map(async (p) => {
          try {
            const raw = await loadMarkdownContent("blog", p.slug);
            const parsed = parseContentForDisplay(raw);
            const cleaned = parsed.content
              .replace(/```[\s\S]*?```/g, '')
              .replace(/`[^`]*`/g, '')
              .replace(/!\[.*?\]\(.*?\)/g, '')
              .replace(/\[.*?\]\(.*?\)/g, '')
              // Remove footnote definitions and references
              .replace(/^\[\^[^\]]+\]:.*$/gm, '')
              .replace(/\[[^\]]+\]/g, '')
              // Strip HTML tags and inline HTML inserts
              .replace(/<[^>]+>/g, ' ')
              .replace(/#{1,6}\s/g, '')
              .replace(/[*_~`]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            return {
              title: p.title,
              excerpt: p.description || "",
              content: cleaned,
              url: `/blog/${p.slug}`,
              type: "blog" as const,
            };
          } catch {
            return {
              title: p.title,
              excerpt: p.description || "",
              url: `/blog/${p.slug}`,
              type: "blog" as const,
            };
          }
        }));

        setSearchItems([
          ...projects.map(mapProject),
          ...postItems,
        ]);
      } catch (e) {
        // Silently fail; search will just have no items
        console.error("Failed to load search content:", e);
      }
    };

    loadAll();
    return () => { isMounted = false; };
  }, []);

  return (
    <nav className="bg-transparent border-b-0 relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <NavLink
            to="/"
            className="abbey-heading text-xl font-medium hover:text-primary transition-colors"
          >
            Aymeric Roucher
          </NavLink>

          <div className="flex items-center space-x-6 ml-auto">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  placeholder="Search posts, projects..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowDropdown(searchQuery.length > 0)}
                  className="w-48 md:w-[16rem] lg:w-[20rem] pl-10 bg-background/40 backdrop-blur-sm"
                />
              </div>

              {showDropdown && searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-50 max-h-[70vh] overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    <div className="py-2">
                      {filteredItems.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect(item.url)}
                          className={`px-4 ${item.type === 'blog' ? 'py-4' : 'py-3'} hover:bg-muted cursor-pointer border-b border-border last:border-b-0`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-muted-foreground mt-1">
                              {getTypeIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-foreground truncate">
                                {item.title}
                              </div>
                              <div className={`text-xs text-muted-foreground mt-1 ${item.type === 'blog' ? 'line-clamp-6' : 'line-clamp-2'}`}>
                                {item.type === "blog" ? (
                                  <Snippet content={item.content || item.excerpt} query={searchQuery} />
                                ) : (
                                  item.excerpt
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// Helper component: builds a snippet bounded by nearest sentence punctuation around the first match
const Snippet = ({ content, query }: { content: string; query: string }) => {
  const q = query.trim();
  if (!q) return <>{content}</>;

  const lowerContent = content.toLowerCase();
  const lowerQuery = q.toLowerCase();
  const idx = lowerContent.indexOf(lowerQuery);
  if (idx === -1) return <>{content}</>;

  const len = content.length;
  const matchEnd = idx + q.length;
  const isBoundary = (ch: string) => /[.!?…\n]/.test(ch);

  // Find sentence start
  let start = idx;
  while (start > 0 && !isBoundary(content[start - 1])) start--;
  while (start < idx && content[start] === ' ') start++;

  // Find sentence end
  let end = matchEnd;
  while (end < len && !isBoundary(content[end])) end++;
  if (end < len) end++; // include the boundary char

  // Ensure minimum snippet length by expanding to previous/next sentence if needed
  const MIN_CHARS = 140;
  while (end - start < MIN_CHARS && (start > 0 || end < len)) {
    // Prefer expanding forward first
    if (end < len) {
      let e2 = end;
      while (e2 < len && !isBoundary(content[e2])) e2++;
      if (e2 < len) e2++;
      end = Math.min(len, Math.max(end, e2));
    }
    if (end - start >= MIN_CHARS) break;
    if (start > 0) {
      let s2 = start;
      while (s2 > 0 && !isBoundary(content[s2 - 1])) s2--;
      while (s2 < start && content[s2] === ' ') s2++;
      start = Math.min(start, s2);
    } else {
      break;
    }
  }

  // Hard cap to avoid excessively tall items
  const MAX_CHARS = 320;
  if (end - start > MAX_CHARS) {
    const half = Math.floor((MAX_CHARS - q.length) / 2);
    start = Math.max(0, idx - half);
    end = Math.min(len, matchEnd + half);
  }

  const snippet = content.slice(start, end);
  const sLower = snippet.toLowerCase();
  const sIdx = sLower.indexOf(lowerQuery);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < len ? '…' : '';

  return (
    <span>
      {prefix}
      {snippet.slice(0, sIdx)}
      <span className="font-semibold">{snippet.slice(sIdx, sIdx + q.length)}</span>
      {snippet.slice(sIdx + q.length)}
      {suffix}
    </span>
  );
};
