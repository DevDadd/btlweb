import React from "react";

const AIResultVideoCard = ({ videoUrl = "", isProcessing = true }) => {
  return (
    <div className="w-full max-w-2xl font-sans">
      <div className="relative flex h-[240px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-400/40 bg-white/[0.03] p-4 sm:h-[280px] lg:h-[330px]">
        {videoUrl ? (
          <video
            controls
            className="h-full w-full rounded-lg object-contain"
            src={videoUrl}
          />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span className="text-center text-xl font-bold text-white">
              {isProcessing ? "AI is analyzing your video..." : "AI video output"}
            </span>
            <span className="mt-2 text-center text-sm font-medium text-gray-300">
              {isProcessing
                ? "The result will appear here when processing is complete."
                : "The AI video is ready to watch."}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AIResultVideoCard;
