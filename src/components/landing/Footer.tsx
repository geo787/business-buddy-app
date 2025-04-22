
const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm text-black font-medium">
            © {new Date().getFullYear()} Customer Retention Platform. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-3">
            <span className="px-2 py-1 md:px-3 md:py-1 bg-secondary rounded-full text-xs font-medium">Responsive Design</span>
            <span className="px-2 py-1 md:px-3 md:py-1 bg-secondary rounded-full text-xs font-medium">Dark Mode</span>
            <span className="px-2 py-1 md:px-3 md:py-1 bg-secondary rounded-full text-xs font-medium">Real-time Analytics</span>
            <span className="px-2 py-1 md:px-3 md:py-1 bg-secondary rounded-full text-xs font-medium">Customer Segmentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
