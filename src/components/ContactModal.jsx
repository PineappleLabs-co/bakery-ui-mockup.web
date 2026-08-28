import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fadeIn border border-white/40">
        
        {/* Header */}
        <div className="p-6 bg-[#23344C] text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Fresh from the Oven</span>
            <h2 className="text-3xl font-bold font-script-title">Get in Touch with pieLabs</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bakery Info */}
          <div className="space-y-4 text-sm text-gray-700">
            <h3 className="font-bold text-gray-900 text-base">Visit Our Bakery</h3>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">pieLabs Artisanal Kitchen</div>
                <div className="text-xs text-gray-500">742 Evergreen Orchard Way, Suite 100<br/>San Francisco, CA 94107</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Fresh Baking Hours</div>
                <div className="text-xs text-gray-500">Mon - Sat: 7:00 AM – 8:00 PM<br/>Sunday: 8:00 AM – 6:00 PM</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Catering & Orders</div>
                <div className="text-xs text-gray-500">(415) 555-PIES (7437)</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">General Inquiries</div>
                <div className="text-xs text-gray-500">hello@pielabsbakery.com</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-emerald-50 rounded-2xl">
                <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
                <h4 className="font-bold text-gray-900 text-lg">Message Sent!</h4>
                <p className="text-xs text-gray-600">Thanks for reaching out! Our head baker will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base">Send Us a Message</h3>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23344C]/30"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23344C]/30"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows="3"
                    placeholder="Ask about custom catering, allergens, or special orders..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23344C]/30 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#23344C] hover:bg-[#1a283b] text-white font-semibold text-sm rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
