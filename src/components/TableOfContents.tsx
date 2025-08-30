import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

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
      const level = match[1].length;
      let text = match[2].trim();
      
      // Replace emoji gear with unicode gear
      text = text.replace(/⚙️/g, '⚙');
      
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      items.push({ id, text, level });
    }

    // Parse technical building blocks
    while ((match = technicalBlockRegex.exec(content)) !== null) {
      const title = match[1];
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      items.push({ id, text: title, level: 4 });
    }

    // Sort items by their position in the content
    items.sort((a, b) => {
      const aIndex = content.indexOf(a.id) !== -1 ? content.indexOf(a.id) : content.indexOf(a.text);
      const bIndex = content.indexOf(b.id) !== -1 ? content.indexOf(b.id) : content.indexOf(b.text);
      return aIndex - bIndex;
    });

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

  return (
    <div className="sticky top-4">
      <div className="bg-background/90 backdrop-blur border rounded-lg p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                block w-full text-left text-base transition-colors duration-200 hover:text-primary flex items-start gap-1
                ${activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground'}
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
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;