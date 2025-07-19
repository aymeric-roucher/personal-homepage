import { Link } from "react-router-dom";

const Readings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="abbey-heading text-4xl font-light mb-4">Readings</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            A collection of papers, articles, and thoughts that have shaped my understanding.
          </p>
        </div>

        {/* Notion Embed Placeholder */}
        <iframe
          src="https://bird-warrior-9c6.notion.site/ebd/2338d6bd102f803dbe58e51fa114d223?v=2338d6bd102f80c59938000c6ad84962"
          width="100%"
          height="600"
          frameBorder={0}
          allowFullScreen
        />

        {/* Sample reading entries for demonstration */}
        <div className="space-y-6">
          <article className="abbey-card group">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="abbey-heading text-lg mb-2 group-hover:text-primary transition-colors">
                  <Link to="/readings/reading-1">Example Paper Title</Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">Author Name • Journal • Year</p>
                <p className="text-foreground/80 leading-relaxed">
                  A brief description or key insight from this reading that caught your attention and influenced your thinking.
                </p>
              </div>
            </div>
          </article>

          <article className="abbey-card group">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="abbey-heading text-lg mb-2 group-hover:text-primary transition-colors">
                  <Link to="/readings/reading-2">Another Interesting Article</Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">Author Name • Publication • Year</p>
                <p className="text-foreground/80 leading-relaxed">
                  Another insightful piece that contributed to your understanding of a particular topic or field of study.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Readings;