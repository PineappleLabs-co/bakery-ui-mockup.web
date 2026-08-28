import React, { useState } from 'react';
import { X, Check, ShoppingCart, Sparkles, Flame } from 'lucide-react';

export default function OrderModal({ 
  isOpen, 
  onClose, 
  currentFlavor, 
  onAddToCart 
}) {
  if (!isOpen) return null;

  const [size, setSize] = useState('slice'); // 'slice' | 'sampler' | 'whole'
  const [crust, setCrust] = useState('Signature Flaky All-Butter');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const sizes = [
    { id: 'slice', name: 'Single Slice', desc: 'Freshly cut warm slice', price: currentFlavor.price },
    { id: 'sampler', name: '4-Slice Sampler', desc: 'Mix & match 4 slices', price: currentFlavor.price * 3.7 },
    { id: 'whole', name: 'Whole 9" Pie', desc: '8 generous slices', price: currentFlavor.wholePrice }
  ];

  const crustOptions = [
    'Signature Flaky All-Butter',
    'Honey Graham Cracker',
    'Gluten-Free Almond Pastry'
  ];

  const extras = [
    { id: 'cream', name: 'Extra Whipped Chantilly Cream', price: 0.75 },
    { id: 'icecream', name: 'Madagascar Vanilla Bean Gelato Scoop', price: 1.50 },
    { id: 'glaze', name: 'Warm Caramel & Honey Glaze', price: 0.50 },
    { id: 'flakes', name: 'Toasted Coconut & Sugar Crunch', price: 0.50 }
  ];

  const toggleExtra = (id) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const selectedSizeObj = sizes.find(s => s.id === size);
  const extrasTotal = selectedExtras.reduce((acc, id) => {
    const extra = extras.find(e => e.id === id);
    return acc + (extra ? extra.price : 0);
  }, 0);
  const itemUnitPrice = (selectedSizeObj ? selectedSizeObj.price : currentFlavor.price) + extrasTotal;
  const totalPrice = itemUnitPrice * quantity;

  const handleConfirmOrder = () => {
    onAddToCart({
      ...currentFlavor,
      cartId: `${currentFlavor.id}-${size}-${Date.now()}`,
      title: `${currentFlavor.title} (${selectedSizeObj.name})`,
      size: selectedSizeObj.name,
      crust,
      extras: selectedExtras.map(id => extras.find(e => e.id === id)?.name),
      price: itemUnitPrice,
      quantity,
      specialInstructions
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fadeIn border border-white/40">
        
        {/* Modal Header with Flavor Theme Gradient */}
        <div 
          className="p-6 relative text-white"
          style={{ backgroundColor: currentFlavor.accentColor }}
        >
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center justify-center border border-white/20 shrink-0">
              <img 
                src={currentFlavor.assets.pieGrp} 
                alt={currentFlavor.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full font-medium">Artisanal Bakery</span>
                <span className="text-xs text-amber-300 font-bold">★ {currentFlavor.rating}</span>
              </div>
              <h2 className="text-2xl font-bold font-script-title tracking-wide mt-1">
                Customize Your {currentFlavor.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[calc(80vh-180px)] overflow-y-auto">
          
          {/* Size Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              1. Choose Size
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    size === s.id
                      ? 'border-[#23344C] bg-[#23344C]/5 ring-2 ring-[#23344C]'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                  }`}
                >
                  <div className="font-bold text-sm text-[#1F2937]">{s.name}</div>
                  <div className="text-[11px] text-gray-500 line-clamp-1">{s.desc}</div>
                  <div className="font-extrabold text-[#23344C] text-sm mt-1">
                    ${s.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Crust Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              2. Crust Style
            </label>
            <div className="space-y-2">
              {crustOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setCrust(c)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                    crust === c
                      ? 'border-[#23344C] bg-[#23344C]/5 text-[#23344C]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{c}</span>
                  {crust === c && <Check className="w-4 h-4 text-[#23344C] stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Toppings */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              3. Gourmet Toppings & Extras
            </label>
            <div className="space-y-2">
              {extras.map((extra) => {
                const isSelected = selectedExtras.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50/60 text-gray-900 font-semibold'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{extra.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-600">+${extra.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Warm it up, extra napkins, gift ribbon..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23344C]/30"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">Total Amount</div>
            <div className="text-2xl font-black text-[#23344C]">
              ${totalPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quantity control */}
            <div className="flex items-center space-x-2 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-500 hover:text-gray-800 font-bold px-1"
              >
                -
              </button>
              <span className="font-bold text-sm text-gray-900 w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-500 hover:text-gray-800 font-bold px-1"
              >
                +
              </button>
            </div>

            {/* Confirm & Add */}
            <button
              onClick={handleConfirmOrder}
              className="flex items-center space-x-2 px-6 py-3 bg-[#23344C] hover:bg-[#1a283b] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#23344C]/20 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
