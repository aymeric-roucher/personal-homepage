import { ContentListItem, loadContentList } from "@/lib/contentLoader";
import CathedralViewer from "@/components/CathedralViewer";
import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BIO_CHUNKS = [
  ["What better time to live in?", ""],
  ["We're at a turning point in history,", "and my craft is the lever that can lift the world."],
  ["I studied at Polytechnique and Cambridge,", "then led the agent team at Hugging Face."],
  ["", "Now I'm exploring the next steps."],
];

const READINGS = [
  {
    title: "Suspicious discontinuities",
    url: "https://danluu.com/discontinuities/",
    date: "2020",
    note: "the bad consequences of thresholds in laws",
  },
  {
    title: "Les conséquences politiques de la paix",
    url: "https://www.gutenberg.org/cache/epub/64322/pg64322-images.html",
    date: "1920",
    note: (
      <>
        Famous historian Jacques Bainville commenting on the flaws of the Treaty of Versailles, and
        predicting 20 years in advance that Germany would rise again, annex Austria, then Poland,
        and would ally with Russia and Italy before turning back on France. More detail in{" "}
        <a
          href="https://x.com/Valen10Francois/status/1652630776976924673?s=20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:opacity-70 transition-opacity"
        >
          this awesome thread
        </a>
        .
      </>
    ),
  },
  {
    title: "History of Western Philosophy",
    url: "https://www.ntslibrary.com/PDF%20Books/History%20of%20Western%20Philosophy.pdf",
    date: "1945",
    note: "Bertrand Russel on philosophy's history: he has an engineer-friendly logical mind, enough ego to point out the flaws in any of the forefathers, and his short historical reminders are an impressive reconciliation of concision and completeness.",
  },
];

const FloatingBio = ({ onToggleControls }: { onToggleControls: () => void }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % BIO_CHUNKS.length);
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [line1, line2] = BIO_CHUNKS[index];

  return (
    <div className="absolute inset-x-0 bottom-36 md:bottom-44 flex pointer-events-none">
      <div className="max-w-4xl w-full mx-auto px-6 md:px-16">
      <div
        className="pointer-events-auto cursor-pointer select-none text-left max-w-xl"
        onClick={onToggleControls}
        style={{
          transition: "opacity 0.6s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
          {line1}
        </p>
        {line2 && (
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mt-1 italic">
            {line2}
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

const About = () => {
  const [projects, setProjects] = useState<ContentListItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<ContentListItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);

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
    <div className="bg-background -mt-[72px]">
      {/* Cathedral — full viewport with bio overlay */}
      <div className="relative flex items-center justify-center" style={{ height: "100vh" }}>
        <CathedralViewer
          style={{ width: "100%", height: "100vh" }}
          showControls={showControls}
        />
        {/* Bio floating over the 3D view — click to toggle controls */}
        <FloatingBio onToggleControls={() => setShowControls((v) => !v)} />
        {/* Scroll indicator — pointing hand, rotated to point down */}
        <div className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none">
          <span
            aria-hidden="true"
            className="text-primary select-none animate-fade-pulse"
            style={{ fontSize: "2rem", transform: "rotate(90deg)", lineHeight: 1 }}
          >
            ☞
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">

        {/* Projects Section */}
        <div className="py-4" id="projects">
          <div className="text-center mb-4">
            <a href="#projects" className="no-underline hover:opacity-70 transition-opacity">
              <h1 className="abbey-heading text-4xl font-light">Projects</h1>
            </a>
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
                <div key={index} className="flex items-start py-6 px-4 border-t border-border first:border-t-0 transition-colors">
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
                  to={post.links?.link ?? `/blog/${post.slug}`}
                  className="group flex items-start py-6 px-4 border-t border-border first:border-t-0 transition-colors hover:bg-muted/50 no-underline"
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

        {/* Separator */}
        <div className="flex justify-center py-4">
          <div className="h-px bg-border w-full max-w-xs"></div>
        </div>

        {/* Readings Section */}
        <div className="py-4">
          <div className="text-center mb-4">
            <h1 className="abbey-heading text-4xl font-light">Readings</h1>
          </div>

          <ul>
            {READINGS.map((reading) => (
              <li key={reading.url} className="abbey-text py-2 flex items-start">
                <span className="text-muted-foreground mr-2 mt-0.5">☞</span>
                <span>
                  <a
                    href={reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:opacity-70 transition-opacity"
                  >
                    {reading.title}
                  </a>
                  <span className="text-muted-foreground"> ({reading.date}) - {reading.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
