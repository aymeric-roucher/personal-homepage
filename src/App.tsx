import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Blog from "./pages/Blog";
import ContentPage from "./pages/ContentPage";
import About from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Readings from "./pages/Readings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Navigation />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          {/* Dynamic content routes */}
          <Route path="/blog/:slug" element={<ContentPage />} />
          <Route path="/projects/:slug" element={<ContentPage />} />
          <Route path="/readings/:slug" element={<ContentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
