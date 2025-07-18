const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="abbey-heading text-4xl font-light mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            A collection of projects that represent my journey in research, development, and creative expression.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="abbey-card group">
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
              Project Title One
            </h3>
            <p className="text-muted-foreground text-sm mb-3">Technology • Year</p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              A compelling description of what this project accomplishes, the problems it solves, and the impact it has made.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="abbey-link">View Project</a>
              <a href="#" className="abbey-link">Source Code</a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="abbey-card group">
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
              Research Project
            </h3>
            <p className="text-muted-foreground text-sm mb-3">Research • Year</p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              An exploration into a fascinating area of study that led to new insights and potential applications.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="abbey-link">Read Paper</a>
              <a href="#" className="abbey-link">Dataset</a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="abbey-card group">
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c.232.232.348.694.348 1.154v1.697a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-1.697c0-.46.116-.922.348-1.154L5 14.5" />
              </svg>
            </div>
            <h3 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
              Creative Work
            </h3>
            <p className="text-muted-foreground text-sm mb-3">Art • Year</p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              A creative endeavor that explores the intersection of technology, art, and human expression.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="abbey-link">View Gallery</a>
              <a href="#" className="abbey-link">Process</a>
            </div>
          </div>

          {/* Project 4 */}
          <div className="abbey-card group">
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
              </svg>
            </div>
            <h3 className="abbey-heading text-xl mb-2 group-hover:text-primary transition-colors">
              Open Source Tool
            </h3>
            <p className="text-muted-foreground text-sm mb-3">Software • Year</p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              A tool built to solve a common problem, shared with the community to benefit others facing similar challenges.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="abbey-link">Documentation</a>
              <a href="#" className="abbey-link">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;