import React, { useState, useEffect } from 'react';
import PieThumbnails from './PieThumbnails';
import ActionButtons from './ActionButtons';

export default function HeroSection({ 
  currentFlavor, 
  prevFlavor,
  flavors, 
  activeFlavorIndex, 
  onSelectFlavor, 
  onAddItem, 
  onOrderNow,
  isTransitioning,
  direction // 1 (forward: Orbital Arc to Next) | -1 (backward: Orbital Arc to Prev)
}) {
  const [scrollY, setScrollY] = useState(0);

  // Subtle Scroll Parallax
  useEffect(() => {
    const handleScroll = () => {
      const y = Math.min(window.scrollY, 350);
      setScrollY(y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxTextOffset = Math.round(scrollY * 0.10);
  const parallaxPieOffset = Math.round(scrollY * 0.07);
  const heroOpacity = Math.max(0.3, 1 - scrollY / 600);

  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full flex items-center overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-12 px-6 sm:px-10 lg:px-16 xl:px-24">
      
      {/* Background Organic Wave Blob Layer (Transitions simultaneously with the pie) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {isTransitioning && prevFlavor ? (
          <>
            {/* Outgoing Blob Wave */}
            <img 
              key={`prev-blob-${prevFlavor.id}`}
              src={prevFlavor.assets.blobSvg} 
              alt="Outgoing background blob" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                animation: direction > 0
                  ? 'blobFlowOutForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  : 'blobFlowOutBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
              }}
            />
            {/* Incoming Blob Wave */}
            <img 
              key={`curr-blob-${currentFlavor.id}`}
              src={currentFlavor.assets.blobSvg} 
              alt="Incoming background blob" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                animation: direction > 0
                  ? 'blobFlowInForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  : 'blobFlowInBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
              }}
            />
          </>
        ) : (
          /* Stable Resting Blob Wave */
          <img 
            src={currentFlavor.assets.blobSvg} 
            alt="Background wave" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90" 
          />
        )}
      </div>

      {/* Floating Decorative Ingredients Layers (Positioned with pointer-events-none outside text safe-zone) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {isTransitioning && prevFlavor ? (
          <>
            {/* Outgoing Ingredients */}
            <img 
              key={`prev-decor-${prevFlavor.id}`}
              src={prevFlavor.assets.ingredientsImg} 
              alt="Outgoing ingredients" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                animation: direction > 0
                  ? 'fruitFlowOutForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  : 'fruitFlowOutBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
              }}
            />
            {/* Incoming Ingredients */}
            <img 
              key={`curr-decor-${currentFlavor.id}`}
              src={currentFlavor.assets.ingredientsImg} 
              alt="Incoming ingredients" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                animation: direction > 0
                  ? 'fruitFlowInForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  : 'fruitFlowInBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
              }}
            />
          </>
        ) : (
          /* Stable Resting Ingredients */
          <img 
            src={currentFlavor.assets.ingredientsImg} 
            alt="Floating ingredients" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-85" 
          />
        )}
      </div>

      {/* Main Grid Content Container */}
      <div 
        className="max-w-[1360px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center z-20 relative"
        style={{ opacity: heroOpacity }}
      >
        
        {/* Left Column: Title, Copy, Selector, Actions — STRICT TEXT SAFE ZONE */}
        <div 
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-start pt-2 lg:pt-0 z-30 relative pointer-events-auto"
          style={{
            transform: `translate3d(0, -${parallaxTextOffset}px, 0)`,
            transition: 'transform 100ms ease-out'
          }}
        >
          
          {/* Title in Script Typography — Simultaneous Dual Layer */}
          <div className="relative mb-2 sm:mb-3 overflow-visible min-h-[3.75rem] sm:min-h-[4.75rem] md:min-h-[5.5rem] lg:min-h-[6.5rem] xl:min-h-[7.5rem] w-full flex items-center">
            {isTransitioning && prevFlavor ? (
              <>
                {/* Outgoing Title */}
                <h1 
                  className="absolute top-0 left-0 font-script-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#23344C] tracking-tight leading-none select-none pointer-events-none"
                  style={{
                    animation: direction > 0
                      ? 'textFlowOutForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'textFlowOutBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  }}
                >
                  {prevFlavor.title}
                </h1>
                {/* Incoming Title */}
                <h1 
                  className="absolute top-0 left-0 font-script-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#23344C] tracking-tight leading-none select-none"
                  style={{
                    animation: direction > 0
                      ? 'textFlowInForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'textFlowInBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  }}
                >
                  {currentFlavor.title}
                </h1>
              </>
            ) : (
              /* Resting Stable Title */
              <h1 className="font-script-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#23344C] tracking-tight leading-none select-none">
                {currentFlavor.title}
              </h1>
            )}
          </div>

          {/* Descriptive Body Copy — Simultaneous Dual Layer */}
          <div className="relative text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-lg mb-2 select-text min-h-[5rem] sm:min-h-[5.5rem] w-full">
            {isTransitioning && prevFlavor ? (
              <>
                {/* Outgoing Description */}
                <div 
                  className="absolute top-0 left-0 text-gray-700/90 space-y-1 pointer-events-none"
                  style={{
                    animation: direction > 0
                      ? 'descFlowOutForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'descFlowOutBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  }}
                >
                  {prevFlavor.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                {/* Incoming Description */}
                <div 
                  className="absolute top-0 left-0 text-gray-700/90 space-y-1"
                  style={{
                    animation: direction > 0
                      ? 'descFlowInForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'descFlowInBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                  }}
                >
                  {currentFlavor.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </>
            ) : (
              /* Resting Stable Description */
              <div className="text-gray-700/90 space-y-1">
                {currentFlavor.lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}
          </div>

          {/* Mini Slices Flavor Selector (4 Dedicated Buttons) */}
          <PieThumbnails 
            flavors={flavors}
            activeFlavorIndex={activeFlavorIndex}
            onSelectFlavor={onSelectFlavor}
          />

          {/* Action Buttons */}
          <div>
            <ActionButtons 
              onAddItem={onAddItem}
              onOrderNow={onOrderNow}
              price={currentFlavor.price}
            />
          </div>

          {/* Rating and Quick Stats */}
          <div className="mt-8 flex items-center space-x-6 text-sm text-[#1F2937]/75 transition-opacity duration-300">
            <div className="flex items-center space-x-1.5 font-medium">
              <span className="text-amber-500 text-base">★</span>
              <span className="font-bold text-[#1F2937]">{currentFlavor.rating}</span>
              <span className="text-xs text-gray-600">({currentFlavor.reviewCount} reviews)</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400/60" />
            <div className="font-medium text-xs sm:text-sm">
              {currentFlavor.calories}
            </div>
          </div>
        </div>

        {/* Right Column: Large Pie CONTINUOUS ORBITAL SWEEP & SIMULTANEOUS HANDOFF */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end overflow-visible pointer-events-none">
          
          <div 
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[620px] 2xl:max-w-[680px] max-h-[58vh] lg:max-h-[68vh] aspect-[1/1] flex items-center justify-center lg:justify-end overflow-visible"
            style={{
              transform: `translate3d(0, -${parallaxPieOffset}px, 0)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            {isTransitioning && prevFlavor ? (
              /* DUAL SLICE ORBITAL HANDOFF: Continuous overlapping curved flow matching reference video */
              <div className="relative w-full h-full flex items-center justify-end overflow-visible">
                
                {/* Outgoing Pie Slice (Sweeps down & outward along the orbital arc) */}
                <div 
                  key={`outgoing-pie-${prevFlavor.id}`}
                  className="absolute inset-0 flex items-center justify-end pointer-events-none"
                  style={{
                    animation: direction > 0
                      ? 'pieOrbitalOutForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'pieOrbitalOutBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards',
                    willChange: 'transform, opacity'
                  }}
                >
                  <img 
                    src={prevFlavor.assets.pieGrp} 
                    alt={prevFlavor.name} 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Incoming Pie Slice (Enters simultaneously along the orbital arc and smoothly settles) */}
                <div 
                  key={`incoming-pie-${currentFlavor.id}`}
                  className="absolute inset-0 flex items-center justify-end pointer-events-none"
                  style={{
                    animation: direction > 0
                      ? 'pieOrbitalInForward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards'
                      : 'pieOrbitalInBackward 680ms cubic-bezier(0.2, 0.85, 0.3, 1) forwards',
                    willChange: 'transform, opacity'
                  }}
                >
                  <img 
                    src={currentFlavor.assets.pieGrp} 
                    alt={currentFlavor.name} 
                    className="w-full h-full object-contain"
                  />
                </div>

              </div>
            ) : (
              /* Settled Active Slice (Completely static and still when idle) */
              <div className="relative w-full h-full flex items-center justify-end pointer-events-auto">
                <img 
                  src={currentFlavor.assets.pieGrp} 
                  alt={`${currentFlavor.name} Pie`} 
                  className="w-full h-full object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                  onClick={onOrderNow}
                  title={`Click to customize & order ${currentFlavor.name} Pie!`}
                />
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

