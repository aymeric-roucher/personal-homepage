const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-center items-center space-x-6">
          <a
            href="https://scholar.google.com/citations?user=xzF8NpcAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <span>Google Scholar</span>
          </a>

          <span className="text-muted-foreground">✯</span>

          <a
            href="https://twitter.com/aymericroucher"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <span>Twitter</span>
          </a>

          <span className="text-muted-foreground">✯</span>

          <a
            href="https://linkedin.com/in/a-roucher"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <span>LinkedIn</span>
          </a>

          <span className="text-muted-foreground">✯</span>

          <a
            href="https://huggingface.co/m-ric"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <span>Hugging Face</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;