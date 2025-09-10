import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import ContentPage from "./pages/ContentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Tracks SPA route changes with GoatCounter, avoiding double-count on first load.
const GoatCounterTracker = () => {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      // Initial page load is counted by the script's onload; skip once here.
      isFirst.current = false;
      return;
    }
    const gc: any = (window as any).goatcounter;
    if (gc && typeof gc.count === "function") {
      gc.count({
        path: location.pathname + location.search + location.hash,
        title: document.title,
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="flex flex-col min-h-screen">
          <GoatCounterTracker />
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<About />} />
              {/* Dynamic content routes */}
              <Route path="/blog/:slug" element={<ContentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
