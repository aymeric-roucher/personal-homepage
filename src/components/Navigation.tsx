import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, FileText, Code, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample individual content items - replace with real data
  const contentItems = [
    { title: "Machine Learning Paper Review", url: "/readings/ml-paper", type: "reading", excerpt: "Analysis of transformer architecture improvements..." },
    { title: "React Performance Optimization", url: "/blog/react-optimization", type: "blog", excerpt: "Tips for optimizing React applications..." },
    { title: "E-commerce Platform", url: "/projects/ecommerce", type: "project", excerpt: "Full-stack e-commerce solution built with React and Node.js..." },
    { title: "Database Design Patterns", url: "/readings/db-patterns", type: "reading", excerpt: "Common patterns for designing scalable databases..." },
    { title: "Building a CLI Tool", url: "/blog/cli-tool", type: "blog", excerpt: "How to create command-line tools with Node.js..." },
    { title: "Mobile App Portfolio", url: "/projects/mobile-app", type: "project", excerpt: "Cross-platform mobile application using React Native..." },
  ];

  const filteredItems = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (url: string) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate(url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reading": return <BookOpen className="h-4 w-4" />;
      case "project": return <Code className="h-4 w-4" />;
      case "blog": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
            <NavLink 
              to="/" 
              className="abbey-heading text-xl font-medium hover:text-primary transition-colors"
            >
              Aymeric Roucher
            </NavLink>
          
          <div className="flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts, projects, readings..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowDropdown(searchQuery.length > 0)}
                  className="w-64 pl-10"
                />
              </div>
              
              {showDropdown && searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    <div className="py-2">
                      {filteredItems.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect(item.url)}
                          className="px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-muted-foreground mt-1">
                              {getTypeIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-foreground truncate">
                                {item.title}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.excerpt}
                              </div>
                              <div className="text-xs text-primary mt-1 capitalize">
                                {item.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `abbey-link text-sm ${isActive ? 'text-primary' : ''}`
                }
              >
                About
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
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `abbey-link text-sm ${isActive ? 'text-primary' : ''}`
                }
              >
                Blog
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;