import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          {/* Image on the left */}
          <div className="order-2 lg:order-1 flex items-center justify-center h-full">
            <div className="aspect-square flex items-center justify-center max-w-md max-h-md">
              <img
                src="/Plan_Soissons_upright_clean.png"
                alt="Aymeric Roucher"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Name and bio on the right */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-xl">
                I like to build stuff on computers.
              </p>
              <p>
                My work spans across machine learning research, software development, and exploring
                how technology can augment human capabilities while preserving the essence of human creativity and connection.
              </p>
              <p>
                This digital space serves as both a repository of my intellectual journey and a platform
                for sharing discoveries that might inspire others on similar paths.
              </p>
            </div>
            <div className="flex items-center space-x-8 mt-8">
              <Link to="/readings" className="abbey-link text-lg">
                Explore Readings
              </Link>
              <Link to="/projects" className="abbey-link text-lg">
                View Projects
              </Link>
              <Link to="/blog" className="abbey-link text-lg">
                Read Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="abbey-card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="abbey-heading text-lg">Readings</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Papers and articles that have shaped my thinking and understanding of complex problems.
            </p>
            <Link to="/readings" className="abbey-link text-sm">
              View all readings →
            </Link>
          </div>

          <div className="abbey-card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="abbey-heading text-lg">Projects</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Research, development, and creative work spanning multiple disciplines and interests.
            </p>
            <Link to="/projects" className="abbey-link text-sm">
              View all projects →
            </Link>
          </div>

          <div className="abbey-card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="abbey-heading text-lg">Thoughts</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Reflections on technology, design, research, and the intersection of human and artificial intelligence.
            </p>
            <Link to="/blog" className="abbey-link text-sm">
              Read thoughts →
            </Link>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="text-center">
          <h2 className="abbey-heading text-2xl font-light mb-6">Philosophy</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-relaxed mb-6">
              I believe in the power of thoughtful technology—systems that amplify human potential
              rather than replace human judgment. My work is guided by the principle that the best
              technologies are those that feel natural and enhance our capabilities seamlessly.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              This space embodies that philosophy: minimal, purposeful, and designed for contemplation
              and meaningful engagement with ideas that matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
