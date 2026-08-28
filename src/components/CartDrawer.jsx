import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.0825;
  const total = subtotal - discountAmount + (subtotal > 0 ? tax : 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'PIELABS20' || promoCode.trim().toUpperCase() === 'PIE20') {
      setDiscount(0.2);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "PIELABS20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#23344C] text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Your Pie Box</h2>
                <p className="text-xs text-gray-500">{cartItems.reduce((a, b) => a + b.quantity, 0)} delicious item(s)</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isOrdered ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Order Placed!</h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Your artisanal pies are being freshly boxed. We will notify you when your order is on the way!
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Your Pie Box is Empty</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Add a delicious warm slice of Pineapple, Apple, Avocado, or Banana pie to get started!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#23344C] text-white font-medium text-sm rounded-xl hover:bg-[#1a283b] transition"
                >
                  Browse Pies
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.cartId || item.id} 
                    className="flex items-center space-x-4 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-gray-200 transition"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-xs border border-gray-100 shrink-0">
                      <img 
                        src={item.assets?.pieGrp || item.assets?.miniSlice} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1F2937] text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.size || 'Single Slice'}</p>
                      {item.crust && <p className="text-[11px] text-gray-400 truncate">Crust: {item.crust}</p>}
                      <div className="mt-1 font-bold text-[#23344C] text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="text-gray-500 hover:text-red-500 p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-gray-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="text-gray-500 hover:text-green-600 p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. PIELABS20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23344C]/30"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">20% discount applied!</p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500 mt-1">{promoError}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && !isOrdered && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F2937] pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#23344C] hover:bg-[#1c2a3e] text-white font-bold rounded-2xl shadow-lg shadow-[#23344C]/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
