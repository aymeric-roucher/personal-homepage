interface TechnicalBlockProps {
  title: string;
  children: React.ReactNode;
}

// Same slugification as TableOfContents/ContentPage headings, so the
// table of contents can scroll to and track this block.
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const TechnicalBlock = ({ title, children }: TechnicalBlockProps) => {
  return (
    <div id={slugify(title)} className="my-8 p-6 bg-card border border-border rounded-lg shadow-sm scroll-mt-4">
      <h4 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
        <span className="mr-2">⚙️</span>
        {title}
      </h4>
      <div className="text-card-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default TechnicalBlock;
