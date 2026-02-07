
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-500 tracking-tight">
            Veriface Forensic AI
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How It Works</a>
          <a href="#why-choose-us" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Why Choose Us</a>
          <a href="#tech-stack" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Tech Stack</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
