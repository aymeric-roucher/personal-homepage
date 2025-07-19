const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-center items-center space-x-6">
          <a 
            href="https://linkedin.com/in/aymeric-roucher" 
            target="_blank" 
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          
          <a 
            href="https://twitter.com/aymeric_roucher" 
            target="_blank" 
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span>Twitter</span>
          </a>
          
          <a 
            href="https://huggingface.co/aymeric-roucher" 
            target="_blank" 
            rel="noopener noreferrer"
            className="abbey-link flex items-center space-x-1 text-muted-foreground hover:text-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.414-5.997 1.414-5.997s-.362-.724-.362-1.794c0-1.682.974-2.938 2.184-2.938 1.03 0 1.527.773 1.527 1.699 0 1.035-.659 2.584-.999 4.019-.284 1.199.602 2.177 1.785 2.177 2.143 0 3.793-2.26 3.793-5.52 0-2.886-2.074-4.904-5.035-4.904-3.431 0-5.444 2.573-5.444 5.23 0 1.035.397 2.147.893 2.75a.36.36 0 01.083.343c-.091.378-.293 1.19-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.357-.63-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
            </svg>
            <span>Hugging Face</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;