import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ 
  currentFlavor, 
  cartCount, 
  onOpenCart, 
  onOpenOrder, 
  onOpenMenu, 
  onOpenContact, 
  onOpenProfile 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 px-6 sm:px-12 lg:px-24 bg-black/10 backdrop-blur-md border-b border-white/10 shadow-sm' 
          : 'pt-6 md:pt-10 pb-4 px-6 sm:px-12 lg:px-24 bg-transparent'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 select-none"
        >
          <img 
            src={currentFlavor.assets.logo} 
            alt="pieLabs Logo" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-sm transition-opacity duration-300" 
          />
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-micro bg-white text-[#1F2937] font-semibold text-sm lg:text-base px-6 lg:px-7 py-2.5 rounded-full shadow-sm"
          >
            Home
          </button>
          <button
            onClick={onOpenMenu}
            className="btn-micro text-white font-medium text-sm lg:text-base px-4 py-2 hover:text-white/90"
          >
            Menu
          </button>
          <button
            onClick={onOpenOrder}
            className="btn-micro text-white font-medium text-sm lg:text-base px-4 py-2 hover:text-white/90"
          >
            Order
          </button>
          <button
            onClick={onOpenContact}
            className="btn-micro text-white font-medium text-sm lg:text-base px-4 py-2 hover:text-white/90"
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Cart and Profile */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="btn-micro relative p-2.5 rounded-full text-white hover:bg-white/20 active:scale-95 cursor-pointer"
          >
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-current" 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#23344C] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Button */}
          <button
            onClick={onOpenProfile}
            aria-label="User Account"
            className="btn-micro p-2.5 rounded-full text-white hover:bg-white/20 active:scale-95 cursor-pointer"
          >
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-current" 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/20 transition-all active:scale-95"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/40 space-y-2.5 animate-fadeIn">
          <button
            onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full text-left py-2.5 px-4 rounded-xl bg-gray-100 font-bold text-[#1F2937]"
          >
            Home
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenMenu(); }}
            className="w-full text-left py-2.5 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            All Pie Flavors (Menu)
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenOrder(); }}
            className="w-full text-left py-2.5 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Order Online
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
            className="w-full text-left py-2.5 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Bakery Locations & Contact
          </button>
        </div>
      )}
    </header>
  );
}
