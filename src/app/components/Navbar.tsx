import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname !== '/' && location.pathname !== '/auth') return null;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white/90 backdrop-blur-md border-[#F0F0F0] shadow-sm" : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FADADD] to-[#F6A5C0] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111111]">
            Gynex<span className="text-[#F6A5C0]">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Tools', 'Pricing', 'Docs'].map((item) => (
            <Link 
              key={item} 
              to="/" 
              className="text-sm font-medium text-[#666666] hover:text-[#F6A5C0] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]">
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-[#F6A5C0] text-white hover:bg-[#EC8AAE] hover:shadow-md transition-all rounded-full px-6 font-semibold border-none">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#666666]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#F0F0F0] p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-lg">
           {['Home', 'Features', 'Tools', 'Pricing', 'Docs'].map((item) => (
            <Link 
              key={item} 
              to="/" 
              className="text-base font-medium text-[#666666] hover:text-[#F6A5C0] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="h-px bg-[#F0F0F0] my-2" />
          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full justify-center bg-[#F6A5C0] text-white font-semibold hover:bg-[#EC8AAE]">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
