interface FigureCardProps {
  src: string;
  alt: string;
  caption: string;
}

const FigureCard = ({ src, alt, caption }: FigureCardProps) => {
  return (
    <div className="my-8 p-6 bg-card border border-border rounded-lg shadow-sm">
      <div className="text-center">
        <img 
          src={src} 
          alt={alt}
          className="mx-auto max-w-full h-auto rounded-md shadow-sm"
        />
        <p className="mt-3 mb-0 text-sm text-card-foreground/70 italic leading-relaxed">
          {caption}
        </p>
      </div>
    </div>
  );
};

export default FigureCard;