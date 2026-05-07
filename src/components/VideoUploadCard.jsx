import React, { useEffect, useRef, useState } from 'react';

const VideoUpload = ({ onVideoSelected }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        const nextPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(nextPreviewUrl);
        onVideoSelected?.(nextPreviewUrl, file);
    };

    return (
        <div className="w-full max-w-2xl font-sans">
            <div className="relative flex h-[240px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-600 transition-colors duration-200 hover:bg-gray-800/50 sm:h-[280px] lg:h-[330px]">
                <input
                    ref={fileInputRef}
                    type="file"
                    className={previewUrl ? "hidden" : "absolute inset-0 w-full h-full opacity-0 cursor-pointer"}
                    accept="video/mp4,video/quicktime,video/webm"
                    title=""
                    onChange={handleFileChange}
                />

                {previewUrl ? (
                    <>
                        <video
                            controls
                            src={previewUrl}
                            className="h-full w-full rounded-xl object-contain p-2"
                        />
                        <button
                            type="button"
                            className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white hover:bg-black/80"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Choose another video
                        </button>
                    </>
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
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span className="text-white text-xl font-bold">
                            Drop video here
                        </span>
                        <span className="text-gray-300 text-sm mt-2 font-medium">
                            MP4, MOV, WebM
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoUpload;