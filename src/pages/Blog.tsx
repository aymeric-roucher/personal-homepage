import { ContentListItem, loadContentList } from "@/lib/contentLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<ContentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const postList = await loadContentList("blog");
        setBlogPosts(postList);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="abbey-heading text-4xl font-light mb-4">Blog</h1>
        </div>

        <div>
          {loading ? (
            Array.from({ length: blogPosts.length || 3 }).map((_, index) => (
              <div key={index} className="flex items-start py-6 border-b border-border last:border-b-0">
                <div className="flex-shrink-0 w-20 mr-6">
                  <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="flex items-start ml-4">
                    <div className="h-4 w-4 bg-muted rounded mr-2 mt-0.5 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <div key={post.slug} className="flex items-start py-6 border-b border-border last:border-b-0">
                <div className="flex-shrink-0 w-20 mr-6">
                  {post.date && (
                    <time dateTime={post.date} className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </time>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="abbey-heading text-xl mb-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`} className="no-underline">
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-start ml-4">
                    <span className="text-muted-foreground mr-2 mt-0.5">☞</span>
                    <p className="abbey-text text-muted-foreground whitespace-pre-line">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </div>

        {blogPosts.length > 0 && (
          <div className="mt-16 p-8 bg-muted/30 rounded-lg border border-border">
            <h2 className="abbey-heading text-xl font-semibold mb-4 text-foreground">
              More Coming Soon
            </h2>
            <p className="abbey-text text-muted-foreground">
              This space will grow with more thoughts and reflections.
              Check back regularly for new posts and insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;