import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Sample data - in real app, this would come from your content
  const searchItems = [
    { title: "Index", url: "/", type: "page" },
    { title: "Readings", url: "/readings", type: "page" },
    { title: "Projects", url: "/projects", type: "page" },
    { title: "Blog", url: "/blog", type: "page" },
    // Add more items as your content grows
  ];

  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      <nav className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink 
              to="/" 
              className="abbey-heading text-xl font-medium hover:text-primary transition-colors"
            >
              Your Name
            </NavLink>
            
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="w-64 justify-start text-muted-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Search pages...
              </Button>
              
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for pages, readings, projects..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {searchItems.map((item) => (
              <CommandItem
                key={item.url}
                onSelect={() => handleSelect(item.url)}
                className="cursor-pointer"
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Navigation;