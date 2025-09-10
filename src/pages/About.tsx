import { ContentListItem, loadContentList } from "@/lib/contentLoader";
import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [projects, setProjects] = useState<ContentListItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<ContentListItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectList = await loadContentList("projects");
        setProjects(projectList);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    const loadBlogPosts = async () => {
      try {
        const postList = await loadContentList("blog");
        setBlogPosts(postList);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    loadProjects();
    loadBlogPosts();
  }, []);

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-6">

        {/* About me Section */}
        <div className="py-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image on the left */}
            <div className="order-2 lg:order-1 flex items-center justify-center h-full">
              <div className="aspect-square flex items-center justify-center max-w-xs max-h-xs">
                <img
                  src="/codist_monk.png"
                  alt="Aymeric Roucher"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Name and bio on the right */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6 text-foreground/80 leading-relaxed">
                <h1 className="text-2xl font-light mb-4">
                  The codist monk
                </h1>
                <p className="text-lg mb-6">
                  What better time to live in? We're at a turning point for human history, and my craft is the lever that can lift the world.
                </p>
                <p className="text-lg mb-6">
                  I studied at Polytechnique and Cambridge, then worked at Hugging Face, where I led the agent development team.
                </p>
                <p className="text-lg mb-6">
                  Now I'm exploring the next steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="flex justify-center py-4">
          <div className="h-px bg-border w-full max-w-xs"></div>
        </div>

        {/* Projects Section */}
        <div className="py-4">
          <div className="text-center mb-4">
            <h1 className="abbey-heading text-4xl font-light">Projects</h1>
          </div>

          <div>
            {projectsLoading ? (
              Array.from({ length: projects.length || 4 }).map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-stretch border-t border-border first:border-t-0 transition-colors">
                  {/* Mobile: Image first */}
                  <div className="md:hidden w-full mt-4 mb-4">
                    <div className="w-full aspect-[4/3] bg-muted animate-pulse"></div>
                  </div>

                  {/* Desktop: Side by side */}
                  <div className="hidden md:flex flex-1 mr-6 py-8">
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded w-3/4 mb-3 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="hidden md:block flex-shrink-0 w-48">
                    <div className="w-full h-full bg-muted animate-pulse"></div>
                  </div>

                  {/* Mobile: Content below */}
                  <div className="md:hidden px-4 pb-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <a
                  key={project.slug}
                  href={project.links?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row md:items-stretch border-t border-border first:border-t-0 transition-colors hover:bg-muted/50 no-underline"
                >
                  {/* Mobile: Image first, full width */}
                  <div className="md:hidden w-full mt-4 mb-4">
                    <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center" style={{ backgroundColor: project.links?.background || 'white' }}>
                      <img
                        src={project.links?.image || "/smollm3_performance.png"}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Desktop: Alternating layout */}
                  <div className="project-contents hidden md:flex flex-1 items-stretch gap-6 [.group:nth-child(even)_&]:flex-row-reverse">
                    <div className="flex-1 py-8">
                      <div className="flex items-center mb-2">
                        <Cog className="text-muted-foreground mr-2 h-4 w-4 flex-shrink-0" />
                        <h3 className="abbey-heading text-xl group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {project.date && (
                          <>
                            <span className="text-muted-foreground mx-3">|</span>
                            <p className="text-sm text-muted-foreground">
                              {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short'
                              })}
                            </p>
                          </>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed ml-6">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-80 self-stretch">
                      <div className="w-full h-full overflow-hidden" style={{ backgroundColor: project.links?.background || 'white' }}>
                        <img
                          src={project.links?.image || "/smollm3_performance.png"}
                          alt={project.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Content below image */}
                  <div className="md:hidden px-4 pb-6">
                    <div className="flex items-center mb-2">
                      <Cog className="text-muted-foreground mr-2 h-4 w-4 flex-shrink-0" />
                      <h3 className="abbey-heading text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.date && (
                        <>
                          <span className="text-muted-foreground mx-3">|</span>
                          <p className="text-sm text-muted-foreground">
                            {new Date(project.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short'
                            })}
                          </p>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed ml-6">
                      {project.description}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No projects found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="flex justify-center py-4">
          <div className="h-px bg-border w-full max-w-xs"></div>
        </div>

        {/* Blog Section */}
        <div className="py-4">
          <div className="text-center mb-4">
            <h1 className="abbey-heading text-4xl font-light">Thoughts</h1>
          </div>

          <div>
            {blogLoading ? (
              Array.from({ length: blogPosts.length || 3 }).map((_, index) => (
                <div key={index} className="flex items-start py-6 border-t border-border first:border-t-0 transition-colors">
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
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex items-start py-6 border-t border-border first:border-t-0 transition-colors hover:bg-muted/50 no-underline"
                >
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
                    <h2 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-start ml-4">
                      <span className="text-muted-foreground mr-2 mt-0.5">☞</span>
                      <p className="abbey-text text-muted-foreground whitespace-pre-line">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No blog posts found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
