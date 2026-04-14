interface FigureCardProps {
  src: string;
  alt: string;
  caption: string;
}

const FigureCard = ({ src, alt, caption }: FigureCardProps) => {
  return (
    <div className="my-8">
      <div className="text-center">
        <img 
          src={src} 
          alt={alt}
          className="mx-auto max-w-full h-auto rounded-md shadow-sm"
        />
        <p className="mt-3 mb-0 text-sm text-card-foreground/70 italic leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      </div>
    </div>
  );
};

export default FigureCard;