import React from 'react';
import { X, Sparkles, Plus, Star } from 'lucide-react';

export default function MenuModal({ 
  isOpen, 
  onClose, 
  flavors, 
  onSelectFlavor, 
  onQuickAdd 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fadeIn border border-white/40">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#23344C] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>pieLabs Seasonal Menu</span>
            </div>
            <h2 className="text-3xl font-bold font-script-title">Our Signature Fruit Pies</h2>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              Baked from scratch every morning with fresh fruits, farm butter, and golden flaky pastry.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[calc(80vh-160px)] overflow-y-auto">
          {flavors.map((flavor, index) => (
            <div 
              key={flavor.id}
              className="group p-5 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{ backgroundColor: `${flavor.blobColor}25` }}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span 
                      className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: flavor.bgColor, color: '#1F2937' }}
                    >
                      {flavor.name} Selection
                    </span>
                    <h3 className="text-2xl font-bold font-script-title text-[#1F2937]">
                      {flavor.title}
                    </h3>
                  </div>
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                    <img 
                      src={flavor.assets.pieGrp} 
                      alt={flavor.name} 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-2">
                  {flavor.descriptionFull}
                </p>

                {/* Ingredients Pills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {flavor.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i} className="text-[10px] bg-white/70 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200/60">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-200/50">
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-extrabold text-[#23344C]">${flavor.price.toFixed(2)}</span>
                  <span className="text-[11px] text-gray-500">/ slice</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onSelectFlavor(index);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 bg-white text-xs font-semibold text-gray-700 hover:text-black rounded-xl border border-gray-200 hover:border-gray-400 transition"
                  >
                    View Page
                  </button>
                  <button
                    onClick={() => onQuickAdd(flavor)}
                    className="flex items-center space-x-1 px-3.5 py-1.5 bg-[#23344C] hover:bg-[#1a283b] text-white text-xs font-semibold rounded-xl shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
