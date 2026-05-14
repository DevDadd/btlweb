import React from "react";

const ExerciseListCard = ({
  icon = <i className="fas fa-fire"></i>,
  title = "Unnamed exercise",
  category = "General",
  description = "No description available.",
  volume = "N/A",
  onClick,
}) => {
  const isClickable = typeof onClick === "function";

  return (
    <div
      className={`group relative overflow-hidden flex w-full flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 font-sans text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-white/[0.06] hover:shadow-[0_8px_20px_rgba(239,68,68,0.15)] animate-fade-in ${
        isClickable ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!isClickable) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      <div className="flex items-center gap-4">
        <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xl transition-transform duration-300 group-hover:scale-105 group-hover:bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          {icon}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold leading-none m-0 text-gray-100 group-hover:text-white transition-colors">{title}</h2>
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-md transition-colors duration-300 group-hover:bg-orange-500/20">
              {category}
            </span>
          </div>
          <p className="text-sm text-gray-400 m-0 transition-colors duration-300 group-hover:text-gray-300 max-w-xl line-clamp-1">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pl-16 md:pl-0 border-t border-white/5 md:border-none pt-3 md:pt-0">
        <div className="flex flex-col md:items-end gap-1">
          <span className="text-lg font-bold leading-none text-white">{volume}</span>
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">
            Volume
          </span>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-gray-500 transition-all duration-300 group-hover:bg-white/[0.1] group-hover:text-white group-hover:translate-x-1">
          <i className="fas fa-chevron-right text-sm"></i>
        </div>
      </div>
    </div>
  );
};

export default ExerciseListCard;