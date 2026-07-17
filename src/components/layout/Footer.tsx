export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#08090a] pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          
          <div>
            <span className="font-bold text-2xl tracking-wide">
              Liyagath<span className="text-gradient"> R</span>
            </span>
            <p className="text-sm text-white/50 mt-2 max-w-sm">
              Architecting the future of artificial intelligence with scalable, data-driven solutions.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Visitor Counter: <span className="text-[var(--color-secondary)] font-mono font-bold">14,203</span>
            </div>
          </div>
          
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {currentYear} Liyagath R. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
