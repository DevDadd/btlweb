import React from "react";

const ExerciseListCard = ({
  icon = "💪",
  title = "Unnamed exercise",
  category = "General",
  description = "No description available.",
  volume = "N/A",
  onClick,
}) => {
  const isClickable = typeof onClick === "function";

  return (
    <div
      className={`group flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/[0.07] p-5 font-sans text-white shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-red-300/50 hover:bg-white/[0.12] hover:shadow-red-900/30 ${
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
      <div className="flex items-center gap-4">
        <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-[1.35rem] font-bold leading-none m-0">{title}</h2>
            <span className="px-3 py-1 text-xs font-semibold text-gray-200 bg-transparent border border-gray-500 rounded-full leading-none transition-colors duration-300 group-hover:border-red-300/60 group-hover:text-red-100">
              {category}
            </span>
          </div>
          <p className="text-[15px] text-gray-400 m-0 transition-colors duration-300 group-hover:text-gray-300">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold leading-none">{volume}</span>
          <span className="text-[11px] font-bold tracking-widest text-gray-400">
            VOLUME
          </span>
        </div>

        <div className="text-gray-500 transition-all duration-300 group-hover:text-red-200 group-hover:scale-110">
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
        </div>
      </div>
    </div>
  );
};

export default ExerciseListCard;