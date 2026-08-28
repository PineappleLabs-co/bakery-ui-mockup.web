import React from 'react';

export default function PieThumbnails({ 
  flavors, 
  activeFlavorIndex, 
  onSelectFlavor 
}) {
  const activeFlavor = flavors[activeFlavorIndex] || flavors[0];

  // Precise underline indicator positions for the 4 slices:
  // Pineapple (0), Avocado (1), Banana (2), Apple (3)
  const indicatorPositions = [
    '4%',    // Pineapple
    '28%',   // Avocado
    '53%',   // Banana
    '77%'    // Apple
  ];

  // Four dedicated 25% clickable zones covering the full 100% width
  const sliceHitAreas = [
    { left: '0%', width: '25%' },   // Slice 1: Pineapple
    { left: '25%', width: '25%' },  // Slice 2: Avocado
    { left: '50%', width: '25%' },  // Slice 3: Banana
    { left: '75%', width: '25%' }   // Slice 4: Apple
  ];

  return (
    <div className="flex flex-col items-start mt-4 sm:mt-6 mb-6 sm:mb-8 select-none bg-transparent border-0 shadow-none relative z-30 pointer-events-auto">
      {/* 4 Mini Slices Row */}
      <div className="relative inline-block bg-transparent border-0 shadow-none p-0 m-0 w-[280px] sm:w-[320px] md:w-[360px]">
        <div className="relative w-full aspect-[380/140] flex items-center bg-transparent border-0 shadow-none">
          <img 
            src={activeFlavor.assets.miniSlice} 
            alt="Select pie flavor" 
            className="w-full h-full object-contain pointer-events-none drop-shadow-md transition-opacity duration-300"
          />

          {/* 4 independent clickable buttons spanning 100% of the selector */}
          <div className="absolute inset-0 z-30 bg-transparent border-0 pointer-events-auto flex">
            {flavors.map((flavor, idx) => (
              <button
                key={flavor.id}
                type="button"
                id={`pie-selector-${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectFlavor(idx);
                }}
                className="absolute top-0 bottom-0 bg-transparent border-0 outline-none cursor-pointer focus:outline-none focus:ring-0 active:scale-95 transition-transform duration-100 group"
                style={{
                  left: sliceHitAreas[idx].left,
                  width: sliceHitAreas[idx].width
                }}
                title={`Select ${flavor.title}`}
                aria-label={`Select ${flavor.title}`}
              >
                <span className="sr-only">{flavor.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selection Bar Underline Indicator */}
        <div className="relative w-full h-3 mt-1 overflow-hidden bg-transparent border-0 shadow-none pointer-events-none">
          <div 
            className="absolute top-0 flex items-center justify-start pointer-events-none"
            style={{ 
              left: indicatorPositions[activeFlavorIndex] || '4%',
              transition: 'left 680ms cubic-bezier(0.2, 0.85, 0.3, 1)'
            }}
          >
            <div className="w-14 sm:w-16 h-[5px] bg-white rounded-full border border-black/25 shadow-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}


