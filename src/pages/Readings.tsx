import { ContentListItem, loadContentList } from "@/lib/contentLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Readings = () => {
  const [readings, setReadings] = useState<ContentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadings = async () => {
      try {
        const readingList = await loadContentList("readings");
        setReadings(readingList);
      } catch (error) {
        console.error("Error loading readings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReadings();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Notion Embed Placeholder */}
        <iframe
          src="https://bird-warrior-9c6.notion.site/ebd/2338d6bd102f803dbe58e51fa114d223?v=2338d6bd102f80c59938000c6ad84962"
          style={{ width: "100%", height: "90vh" }}
          frameBorder={0}
          allowFullScreen
        />

        {/* Dynamic reading entries */}
        <div className="space-y-6">
          {loading ? (
            // Loading skeleton for all potential cards
            Array.from({ length: readings.length || 6 }).map((_, index) => (
              <article key={index} className="abbey-card">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-muted rounded-full mt-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </article>
            ))
          ) : readings.length > 0 ? (
            readings.map((reading) => (
              <article key={reading.slug} className="abbey-card group">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="abbey-heading text-lg mb-2 group-hover:text-primary transition-colors">
                      <Link to={`/readings/${reading.slug}`}>{reading.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{reading.metadata}</p>
                    <p className="text-foreground/80 leading-relaxed">
                      {reading.description}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-8">
              {/* <p className="text-muted-foreground">No readings found.</p> */}
              {/* Nothing for now */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Readings;