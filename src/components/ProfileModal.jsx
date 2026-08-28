import React from 'react';
import { X, Award, History, Heart, Gift, ChevronRight } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fadeIn border border-white/40">
        
        {/* Header */}
        <div className="p-6 bg-[#23344C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-gray-900 font-bold flex items-center justify-center text-lg shadow-inner">
              AB
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Abhigna</h2>
              <p className="text-xs text-amber-300 font-medium">PieClub VIP Member</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loyalty Points Banner */}
        <div className="bg-amber-500/15 p-4 mx-6 mt-6 rounded-2xl border border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-400 text-gray-900 rounded-xl shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium">Pie Rewards Balance</div>
              <div className="text-xl font-black text-[#1F2937]">240 Points</div>
            </div>
          </div>
          <button className="text-xs font-bold bg-[#23344C] text-white px-3 py-1.5 rounded-lg shadow-xs hover:bg-[#1a283b] transition">
            Redeem Slice
          </button>
        </div>

        {/* Quick Menu List */}
        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center space-x-3 text-gray-700">
              <History className="w-5 h-5 text-[#23344C]" />
              <span className="text-sm font-semibold">Recent Orders</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>3 orders</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center space-x-3 text-gray-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold">Saved Favorites</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Pineapple, Apple</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center space-x-3 text-gray-700">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold">Gift Cards & Rewards</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>$15.00 Credit</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button 
            onClick={onClose}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}
