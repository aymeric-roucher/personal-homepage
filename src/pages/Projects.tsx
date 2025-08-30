import { ContentListItem, loadContentList } from "@/lib/contentLoader";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState<ContentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectList = await loadContentList("projects");
        setProjects(projectList);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="abbey-heading text-4xl font-light mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Stuff that I've built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
            Array.from({ length: projects.length || 4 }).map((_, index) => (
              <div key={index} className="abbey-card">
                <div className="aspect-video bg-muted rounded-lg mb-4 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-3 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                </div>
              </div>
            ))
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <a key={project.slug} href={project.links?.link} target="_blank" rel="noopener noreferrer" className="abbey-card group cursor-pointer block">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden flex items-center justify-center" style={{ backgroundColor: project.links?.background || 'white' }}>
                  <img
                    src={project.links?.image || "/smollm3_performance.png"}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {project.description}
                </p>
              </a>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;