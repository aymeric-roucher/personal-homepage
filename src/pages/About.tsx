import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          {/* Image on the left */}
          <div className="order-2 lg:order-1 flex items-center justify-center h-full">
            <div className="aspect-square flex items-center justify-center max-w-sm max-h-sm">
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
                I try to put these skills to good use.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="abbey-heading text-lg mb-3">
                    <Link to="/readings" className="hover:text-primary transition-colors">
                      Readings
                    </Link>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed mb-2">
                    Papers and articles that have shaped my understanding of AI.
                  </p>
                  <Link to="/readings" className="abbey-link text-sm">
                    View all readings ☞
                  </Link>
                </div>

                <div>
                  <h3 className="abbey-heading text-lg mb-3">
                    <Link to="/projects" className="hover:text-primary transition-colors">
                      Projects
                    </Link>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed mb-2">
                    Open source libraries, Research efforts, websites.
                  </p>
                  <Link to="/projects" className="abbey-link text-sm">
                    View all projects ☞
                  </Link>
                </div>

                <div>
                  <h3 className="abbey-heading text-lg mb-3">
                    <Link to="/blog" className="hover:text-primary transition-colors">
                      Thoughts
                    </Link>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed mb-2">
                    Beware, this is all extremely scale-pilled.
                  </p>
                  <Link to="/blog" className="abbey-link text-sm">
                    Read thoughts ☞
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Philosophy Section */}
        {/* <div className="text-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default About;
