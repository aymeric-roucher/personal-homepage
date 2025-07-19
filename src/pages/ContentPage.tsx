import { Button } from "@/components/ui/button";
import { loadMarkdownContent } from "@/lib/contentLoader";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

const ContentPage = () => {
  const { type: typeParam, slug } = useParams<{ type?: string; slug?: string }>();
  const location = useLocation();
  // If :type param is not in the route definition (e.g. /blog/:slug), infer it from pathname
  const type = typeParam || location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContentAsync = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!type || !slug) return;

        const raw = await loadMarkdownContent(type, slug);
        setContent(raw);
      } catch (err) {
        setError("Failed to load content");
        console.error("Error loading content:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContentAsync();
  }, [type, slug]);

  const getBackPath = () => {
    switch (type) {
      case "blog":
        return "/blog";
      case "projects":
        return "/projects";
      case "readings":
        return "/readings";
      default:
        return "/";
    }
  };

  const getPageTitle = () => {
    switch (type) {
      case "blog":
        return "Blog";
      case "projects":
        return "Projects";
      case "readings":
        return "Readings";
      default:
        return "Content";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate(getBackPath())}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {getPageTitle()}
          </Button>
          <div className="text-center">
            <h1 className="abbey-heading text-2xl font-bold mb-4">Content Not Found</h1>
            <p className="text-muted-foreground">
              The content you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(getBackPath())}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {getPageTitle()}
        </Button>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="abbey-heading text-4xl font-bold mb-6 text-foreground">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="abbey-heading text-2xl font-semibold mt-8 mb-4 text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="abbey-heading text-xl font-semibold mt-6 mb-3 text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="abbey-text text-foreground/80 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="abbey-link text-primary hover:text-primary/80 underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={`${className} block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono`}>
                    {children}
                  </code>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 text-foreground/80">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 text-foreground/80">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1">
                  {children}
                </li>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default ContentPage;