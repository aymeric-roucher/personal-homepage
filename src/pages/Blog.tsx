import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  // Sample blog posts - replace with real content
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications",
      excerpt: "Thoughts on the current state of web development and emerging trends that are shaping the future of digital experiences.",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      excerpt: "Why less is often more in digital design, and how minimalism can enhance user experience and functionality.",
      date: "2024-01-10",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Reflections on Technology and Society",
      excerpt: "Exploring the intersection between technological advancement and human connection in our increasingly digital world.",
      date: "2024-01-05",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="abbey-heading text-4xl font-bold mb-4 text-foreground">
            Thoughts & Reflections
          </h1>
          <p className="abbey-text text-lg text-muted-foreground">
            A collection of thoughts, ideas, and reflections on technology, design, and life.
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="abbey-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="abbey-heading text-xl mb-2 hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="abbey-text text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>{post.readTime}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-muted/30 rounded-lg border border-border">
          <h2 className="abbey-heading text-xl font-semibold mb-4 text-foreground">
            More Coming Soon
          </h2>
          <p className="abbey-text text-muted-foreground">
            This space will grow with more thoughts and reflections. 
            Check back regularly for new posts and insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;