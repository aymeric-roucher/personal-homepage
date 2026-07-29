import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
  position: number;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const technicalBlockRegex = /<div class="technical-block" data-title="([^"]+)"/gm;
    const items: TocItem[] = [];
    let match;

    // Parse regular headings
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim().replace(/⚙️/g, '⚙');
      items.push({ id: slugify(text), text, level: match[1].length, position: match.index });
    }

    // Parse technical building blocks
    while ((match = technicalBlockRegex.exec(content)) !== null) {
      const text = match[1];
      items.push({ id: slugify(text), text, level: 4, position: match.index });
    }

    // Sort by actual position in the content so headings and blocks interleave correctly
    items.sort((a, b) => a.position - b.position);

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    const headingElements = tocItems.map(item =>
      document.getElementById(item.id)
    ).filter(Boolean);

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = tocItems.findIndex((item) => item.id === activeId);

  return (
    <div className="sticky top-4">
      <div className="py-1 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <nav className="space-y-1">
          {tocItems.map((item, index) => {
            const isActive = activeId === item.id;
            // Titles below the current reading position are not yet read: dim them
            const isUpcoming = !isActive && index > activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  block w-full text-left text-base transition-all duration-200 hover:text-primary flex items-start gap-1
                  ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}
                  ${isUpcoming ? 'opacity-40 hover:opacity-100' : ''}
                `}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                {item.level === 4 && (
                  <span className="text-xs mt-1 flex-shrink-0">⚙</span>
                )}
                <span className={item.level === 4 ? 'flex-1' : ''}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;