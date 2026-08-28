import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Toast({ message, visible, onAction, actionText }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp select-none">
      <div className="flex items-center space-x-3 bg-[#23344C] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20">
        <div className="p-1 bg-emerald-500 rounded-full text-white">
          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
        </div>
        <div className="text-sm font-semibold tracking-wide">
          {message}
        </div>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="ml-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 transition"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
