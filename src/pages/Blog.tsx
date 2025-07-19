import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { loadContentList, ContentListItem } from "@/lib/contentLoader";

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
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            A collection of thoughts, ideas, and reflections on technology, design, and life.
          </p>
        </div>

        <div className="space-y-8">
          {loading ? (
            Array.from({ length: blogPosts.length || 3 }).map((_, index) => (
              <Card key={index} className="abbey-card">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-4">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card key={post.slug} className="abbey-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <CardTitle className="abbey-heading text-xl mb-2 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="abbey-text text-muted-foreground">
                        {post.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4">
                    {post.date && (
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>
                </CardHeader>
              </Card>
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