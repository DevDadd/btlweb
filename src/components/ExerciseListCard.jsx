import React from 'react';

const WorkoutCard = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/[0.07] p-5 font-sans text-white shadow-2xl backdrop-blur-2xl">
      
      {/* Cột trái: Icon và Thông tin */}
      <div className="flex items-center gap-4">
        {/* Emoji Icon */}
        <span className="text-3xl">💪</span>
        
        {/* Text Box */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-[1.35rem] font-bold leading-none m-0">Bench Press</h2>
            <span className="px-3 py-1 text-xs font-semibold text-gray-200 bg-transparent border border-gray-500 rounded-full leading-none">
              Chest
            </span>
          </div>
          <p className="text-[15px] text-gray-400 m-0">
            Focus on bar path and elbow tuck.
          </p>
        </div>
      </div>

      {/* Cột phải: Chỉ số và Nút Check */}
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold leading-none">4 × 8</span>
          <span className="text-[11px] font-bold tracking-widest text-gray-400">
            VOLUME
          </span>
        </div>
        
        {/* Check Button (Sử dụng SVG) */}
        <button className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </button>
      </div>
      
    </div>
  );
};

export default WorkoutCard;