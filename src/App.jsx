import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FLAVORS } from './data/flavors';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CartDrawer from './components/CartDrawer';
import OrderModal from './components/OrderModal';
import MenuModal from './components/MenuModal';
import ContactModal from './components/ContactModal';
import ProfileModal from './components/ProfileModal';
import Toast from './components/Toast';

export default function App() {
  const [activeFlavorIndex, setActiveFlavorIndex] = useState(0);
  const [prevFlavorIndex, setPrevFlavorIndex] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward (Arc Forward), -1 = backward (Arc Backward)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      ...FLAVORS[0],
      cartId: 'default-pineapple-1',
      title: 'Pineapple Pie (Single Slice)',
      size: 'Single Slice',
      crust: 'Signature Flaky All-Butter',
      price: FLAVORS[0].price,
      quantity: 1
    }
  ]);
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ visible: false, message: '', actionText: '', onAction: null });

  const currentFlavor = FLAVORS[activeFlavorIndex];
  const prevFlavor = prevFlavorIndex !== null ? FLAVORS[prevFlavorIndex] : null;

  const isTransitioningRef = useRef(false);
  const queuedTargetRef = useRef(null);
  const transitionTimerRef = useRef(null);

  // Preload all assets and SVGs on mount for instantaneous, flicker-free rendering
  useEffect(() => {
    FLAVORS.forEach(flavor => {
      const p = new Image();
      p.src = flavor.assets.pieGrp;
      const m = new Image();
      m.src = flavor.assets.miniSlice;
      const ing = new Image();
      ing.src = flavor.assets.ingredientsImg;
      const b = new Image();
      b.src = flavor.assets.blobSvg;
    });
  }, []);

  // Show Toast helper
  const showToast = (message, actionText = '', onAction = null) => {
    setToast({ visible: true, message, actionText, onAction });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Continuous Orbital Arc Scene Transition (~680ms, derived from reference video)
  const changeFlavor = useCallback((targetIndex, explicitDirection = null) => {
    if (targetIndex === activeFlavorIndex && !isTransitioningRef.current) return;
    
    // Calculate direction along the circle
    let dir = explicitDirection;
    if (dir === null) {
      if (targetIndex === 0 && activeFlavorIndex === FLAVORS.length - 1) {
        dir = 1;
      } else if (targetIndex === FLAVORS.length - 1 && activeFlavorIndex === 0) {
        dir = -1;
      } else {
        dir = targetIndex > activeFlavorIndex ? 1 : -1;
      }
    }
    setDirection(dir);

    // Cancel any in-flight timer and start fresh transition
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    const fromIndex = activeFlavorIndex;
    setPrevFlavorIndex(fromIndex);
    setActiveFlavorIndex(targetIndex);
    setIsTransitioning(true);
    isTransitioningRef.current = true;

    // Complete timeline after 680ms and seamlessly commit to stable idle state
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPrevFlavorIndex(null);
      isTransitioningRef.current = false;
    }, 680);
  }, [activeFlavorIndex]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (activeFlavorIndex + 1) % FLAVORS.length;
        changeFlavor(nextIndex, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (activeFlavorIndex - 1 + FLAVORS.length) % FLAVORS.length;
        changeFlavor(prevIndex, -1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFlavorIndex, changeFlavor]);

  // Add Item handler
  const handleAddItem = () => {
    const newItem = {
      ...currentFlavor,
      cartId: `${currentFlavor.id}-slice-${Date.now()}`,
      title: `${currentFlavor.title} (Single Slice)`,
      size: 'Single Slice',
      crust: 'Signature Flaky All-Butter',
      price: currentFlavor.price,
      quantity: 1
    };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === currentFlavor.id && item.size === 'Single Slice' && !item.extras?.length);
      if (existing) {
        return prev.map(item => 
          item.cartId === existing.cartId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });

    showToast(`Added ${currentFlavor.title} to your pie box!`, 'View Box', () => setIsCartOpen(true));
  };

  // Quick add from Menu
  const handleQuickAdd = (flavor) => {
    const newItem = {
      ...flavor,
      cartId: `${flavor.id}-slice-${Date.now()}`,
      title: `${flavor.title} (Single Slice)`,
      size: 'Single Slice',
      crust: 'Signature Flaky All-Butter',
      price: flavor.price,
      quantity: 1
    };

    setCartItems(prev => [...prev, newItem]);
    showToast(`Added ${flavor.title} to your pie box!`, 'View Box', () => setIsCartOpen(true));
  };

  // Add customized item from OrderModal
  const handleAddToCartCustom = (customItem) => {
    setCartItems(prev => [...prev, customItem]);
    showToast(`Added customized ${customItem.title} to your pie box!`, 'View Box', () => setIsCartOpen(true));
  };

  // Cart quantity update
  const handleUpdateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item
  const handleRemoveItem = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div 
      className="min-h-screen w-full transition-colors ease-out relative flex flex-col justify-between overflow-x-hidden"
      style={{ 
        backgroundColor: currentFlavor.bgColor,
        transitionDuration: '680ms',
        transitionTimingFunction: 'cubic-bezier(0.2, 0.85, 0.3, 1)'
      }}
    >
      {/* Top Navigation */}
      <Navbar 
        currentFlavor={currentFlavor}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Hero View with Fast Orbital Arc Flow */}
      <main className="flex-1 flex items-center overflow-hidden">
        <HeroSection 
          currentFlavor={currentFlavor}
          prevFlavor={prevFlavor}
          flavors={FLAVORS}
          activeFlavorIndex={activeFlavorIndex}
          onSelectFlavor={(idx) => changeFlavor(idx)}
          onAddItem={handleAddItem}
          onOrderNow={() => setIsOrderOpen(true)}
          isTransitioning={isTransitioning}
          direction={direction}
        />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Order Customization Modal */}
      <OrderModal 
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        currentFlavor={currentFlavor}
        onAddToCart={handleAddToCartCustom}
      />

      {/* Full Menu Modal */}
      <MenuModal 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        flavors={FLAVORS}
        onSelectFlavor={(idx) => changeFlavor(idx)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Contact & Hours Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* User Loyalty Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Toast Feedback Notification */}
      <Toast 
        message={toast.message}
        visible={toast.visible}
        actionText={toast.actionText}
        onAction={toast.onAction}
      />
    </div>
  );
}
