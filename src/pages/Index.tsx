import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="abbey-heading text-5xl font-light mb-6">
            Your Name
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8">
            A brief introduction to who you are, your interests, and what drives your work. 
            This space welcomes visitors to your intellectual sanctuary.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <Link to="/readings" className="abbey-link text-lg">
              Explore Readings
            </Link>
            <Link to="/projects" className="abbey-link text-lg">
              View Projects
            </Link>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="abbey-card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="abbey-heading text-lg">Recent Readings</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Discover the latest papers and articles that have captured my attention and influenced my thinking.
            </p>
            <Link to="/readings" className="abbey-link text-sm">
              View all readings →
            </Link>
          </div>

          <div className="abbey-card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="abbey-heading text-lg">Latest Projects</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Explore my recent work spanning research, development, and creative endeavors.
            </p>
            <Link to="/projects" className="abbey-link text-sm">
              View all projects →
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center">
          <h2 className="abbey-heading text-2xl font-light mb-6">About</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-relaxed mb-6">
              This space serves as a digital abbey—a place of contemplation and sharing. 
              Here you'll find my intellectual journey through readings that have shaped my understanding, 
              and projects that represent my attempts to contribute something meaningful to the world.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              The design embraces minimalism and the timeless quality of abbey architecture, 
              creating a serene environment for reflection and discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
