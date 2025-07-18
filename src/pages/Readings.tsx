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
        <div className="abbey-card mb-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="abbey-heading text-xl mb-2">Notion Embed Placeholder</h3>
            <p className="text-muted-foreground mb-4">
              This section will contain your Notion readings page embed.
            </p>
            <div className="text-sm text-muted-foreground bg-muted/50 rounded p-4 inline-block">
              Add your Notion embed code here
            </div>
          </div>
        </div>

        {/* Sample reading entries for demonstration */}
        <div className="space-y-6">
          <article className="abbey-card group">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="abbey-heading text-lg mb-2 group-hover:text-primary transition-colors">
                  Example Paper Title
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
                  Another Interesting Article
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