const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Aymeric Roucher. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Built with care and minimalist principles
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;