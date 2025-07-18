import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/" 
            className="abbey-heading text-xl font-medium hover:text-primary transition-colors"
          >
            Your Name
          </NavLink>
          
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `abbey-link text-sm ${isActive ? 'text-primary' : ''}`
              }
            >
              Index
            </NavLink>
            <NavLink 
              to="/readings" 
              className={({ isActive }) => 
                `abbey-link text-sm ${isActive ? 'text-primary' : ''}`
              }
            >
              Readings
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `abbey-link text-sm ${isActive ? 'text-primary' : ''}`
              }
            >
              Projects
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;