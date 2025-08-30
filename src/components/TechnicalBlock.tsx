interface TechnicalBlockProps {
  title: string;
  children: React.ReactNode;
}

const TechnicalBlock = ({ title, children }: TechnicalBlockProps) => {
  return (
    <div className="my-8 p-6 bg-card border border-border rounded-lg shadow-sm">
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