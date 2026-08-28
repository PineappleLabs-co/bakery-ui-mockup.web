import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ActionButtons({ 
  onAddItem, 
  onOrderNow, 
  price 
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 select-none z-30 relative">
      {/* Add Item Button */}
      <button
        onClick={onAddItem}
        className="btn-micro group relative flex items-center justify-center space-x-2.5 bg-[#23344C] text-white px-6 py-3 rounded-[15px] shadow-btn-dark active:scale-[0.97] cursor-pointer min-w-[135px]"
        aria-label="Add Item to Cart"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDuration: '180ms'
        }}
      >
        <span className="font-medium text-sm sm:text-base tracking-wide">Add Item</span>
        <svg 
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-current transition-transform duration-200 group-hover:translate-x-0.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </button>

      {/* Order Now Button */}
      <button
        onClick={onOrderNow}
        className="btn-micro group relative flex items-center justify-center space-x-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-[#23344C] px-6 py-3 rounded-[15px] shadow-btn-light border border-white/30 active:scale-[0.97] cursor-pointer min-w-[135px]"
        aria-label="Order Now"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDuration: '180ms'
        }}
      >
        <span className="font-semibold text-sm sm:text-base tracking-wide">Order Now</span>
        <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      {/* Price tag badge */}
      <div className="hidden sm:flex items-center text-xs font-semibold text-[#1F2937]/80 bg-white/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/30 shadow-xs transition-all duration-300">
        ${price.toFixed(2)} / slice
      </div>
    </div>
  );
}
