import { Button } from "@/components/ui/button";
import { loadMarkdownContent, parseContentForDisplay } from "@/lib/contentLoader";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import PlotlyChart from "@/components/PlotlyChart";
import FigureCard from "@/components/FigureCard";
import TechnicalBlock from "@/components/TechnicalBlock";
import TableOfContents from "@/components/TableOfContents";

const ContentPage = () => {
  const { type: typeParam, slug } = useParams<{ type?: string; slug?: string }>();
  const location = useLocation();
  // If :type param is not in the route definition (e.g. /blog/:slug), infer it from pathname
  const type = typeParam || location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [parsedContent, setParsedContent] = useState<{title: string; date: string; content: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createHeadingId = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    const loadContentAsync = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!type || !slug) return;

        const raw = await loadMarkdownContent(type, slug);
        const parsed = parseContentForDisplay(raw);
        setParsedContent(parsed);
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
    return "/";
  };

  const getPageTitle = () => {
    return "Home";
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
          <button
            onClick={() => navigate(getBackPath())}
            className="abbey-link mb-8 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {getPageTitle()}
          </button>
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
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-4">
        {/* Left column - empty spacer */}
        <div className="hidden lg:block lg:col-span-3"></div>

        {/* Center column - main content */}
        <div className="lg:col-span-6 max-w-4xl mx-auto px-6 py-4 lg:px-0 lg:py-0">
          <button
            onClick={() => navigate(getBackPath())}
            className="abbey-link mb-8 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {getPageTitle()}
          </button>

          {/* Title and Date */}
          <div className="mb-8">
            <h1 className="abbey-heading text-4xl font-bold mb-4 text-foreground">
              {parsedContent?.title}
            </h1>
            {parsedContent?.date && (
              <time 
                dateTime={parsedContent.date} 
                className="text-muted-foreground text-sm"
              >
                {new Date(parsedContent.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>

          <article className="prose prose-slate dark:prose-invert max-w-none">
          {(() => {
            const raw = parsedContent?.content || '';
            // Escape custom tokens like <end> so they render as text rather than unknown HTML tags
            const safeContent = raw
              .replace(/<\s*end\s*>/gi, '&lt;end&gt;')
              .replace(/<\s*\/\s*end\s*>/gi, '&lt;/end&gt;');
            return (
              <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              h1: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h2 id={id} className="abbey-heading text-2xl font-semibold mt-8 mb-4 text-foreground">
                    {children}
                  </h2>
                );
              },
              h2: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h2 id={id} className="abbey-heading text-2xl font-semibold mt-8 mb-4 text-foreground">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h3 id={id} className="abbey-heading text-xl font-semibold mt-6 mb-3 text-foreground">
                    {children}
                  </h3>
                );
              },
              h4: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h4 id={id} className="abbey-heading text-lg font-semibold mt-5 mb-2 text-foreground">
                    {children}
                  </h4>
                );
              },
              h5: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h5 id={id} className="abbey-heading text-base font-semibold mt-4 mb-2 text-foreground">
                    {children}
                  </h5>
                );
              },
              h6: ({ children }) => {
                const id = createHeadingId(children?.toString() || '');
                return (
                  <h6 id={id} className="abbey-heading text-sm font-semibold mt-4 mb-2 text-foreground">
                    {children}
                  </h6>
                );
              },
              p: ({ children }) => (
                <p className="abbey-text text-foreground/80 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              a: ({ href, children, ...props }) => {
                const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
                const isAnchor = typeof href === 'string' && href.startsWith('#');
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!isAnchor) return;
                  const id = (href || '').slice(1);
                  const el = document.getElementById(id);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // update the hash without adding a new history entry
                    history.replaceState(null, '', `#${id}`);
                  }
                };
                return (
                  <a
                    {...props}
                    href={href}
                    onClick={handleClick}
                    className="abbey-link text-primary hover:text-primary/80 underline"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                );
              },
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
              li: ({ children, ...props }) => (
                <li {...props} className={`${(props as any).className || ''} mb-1`.trim()}>
                  {children}
                </li>
              ),
              video: ({ src, width, height, controls, preload, style, children, ...props }) => (
                <video 
                  {...props}
                  width={width || "100%"}
                  height={height || "auto"}
                  controls={controls !== undefined ? controls : true}
                  preload={preload || "metadata"}
                  className="w-full h-auto rounded-lg my-6"
                  style={{ borderRadius: '4px', maxWidth: '100%', ...style }}
                >
                  {src && <source src={src} type="video/mp4" />}
                  {children}
                  <p>Your browser does not support the video tag. <a href={src} target="_blank" rel="noopener noreferrer">Click here to view the video directly</a>.</p>
                </video>
              ),
              iframe: ({ src, height, ...props }) => (
                <iframe
                  {...props}
                  src={src}
                  className="w-full my-6 rounded-lg"
                  style={{ border: 'none', height: height ? `${height}px` : '570px' }}
                />
              ),
              div: ({ className, children, ...props }) => {
                // Check if this is a plotly chart div
                if (className && className.includes('plotly-chart')) {
                  const dataSrc = props['data-src'] as string;
                  if (dataSrc) {
                    return <PlotlyChart src={dataSrc} />;
                  }
                }
                
                // Check if this is a figure card
                if (className && className.includes('figure-card')) {
                  const src = props['data-src'] as string;
                  const alt = props['data-alt'] as string;
                  const caption = props['data-caption'] as string;
                  if (src && alt && caption) {
                    return <FigureCard src={src} alt={alt} caption={caption} />;
                  }
                }
                
                // Check if this is a technical block
                if (className && className.includes('technical-block')) {
                  const title = props['data-title'] as string;
                  if (title) {
                    return (
                      <TechnicalBlock title={title}>
                        {children}
                      </TechnicalBlock>
                    );
                  }
                }
                
                // Otherwise render as normal div
                return (
                  <div className={className} {...props}>
                    {children}
                  </div>
                );
              }
            }}
          >
            {safeContent}
          </ReactMarkdown>
            );
          })()}
          </article>
        </div>
        
        {/* Right column - Table of Contents */}
        <div className="hidden lg:block lg:col-span-3">
          {/* Empty spacer to align TOC with article start */}
          <div className="h-32"></div>
          {type === 'blog' && parsedContent?.content && (
            <TableOfContents content={parsedContent.content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
