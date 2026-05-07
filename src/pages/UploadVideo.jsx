import { useState } from "react";
import AppBar from "../components/AppBar";
import Background from "../components/Background";
import VideoUploadCard from "../components/VideoUploadCard";
import AIResultVideoCard from "../components/AIResultVideoCard";

const EXERCISE_OPTIONS = [
    "squat",
    "deadlift",
    "pushup",
    "shoulder_press",
    "lunge",
    "plank",
    "bicep_curl",
];

export default function UploadVideo() {
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");

    return (
        <>
            <AppBar />
            <Background gradientOnly />
            <main
                style={{
                    maxWidth: 1400,
                    margin: "120px auto 40px",
                    padding: "0 20px 48px",
                }}
            >
                <div className="flex flex-col items-center">
                    <div className="Sizedbox30" aria-hidden="true" />
                    <div className="top-text top-text-mixed">
                        Upload & <span className="logo-highlight">Transform</span>
                    </div>
                    <div className="Sizedbox" aria-hidden="true" />
                    <div className="subtitle">
                        Upload your video and get AI-powered feedback on your technique.
                    </div>
                    <div className="Sizedbox" aria-hidden="true" />
                    <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-2xl">
                        <label
                            htmlFor="exercise-select"
                            className="mb-2 block text-sm font-semibold text-white"
                        >
                            Choose an exercise to analyze
                        </label>
                        <select
                            id="exercise-select"
                            value={selectedExercise}
                            onChange={(event) => setSelectedExercise(event.target.value)}
                            className="h-12 w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl outline-none transition-all duration-300 hover:border-red-300/50 hover:bg-white/[0.1] focus:border-red-300/60 focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)] disabled:cursor-not-allowed disabled:opacity-70 [color-scheme:dark]"
                        >
                            <option value="" className="bg-[#111827] text-white">
                                Select an exercise
                            </option>
                            {EXERCISE_OPTIONS.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                    className="bg-[#111827] text-white"
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="Sizedbox" aria-hidden="true" />
                    <div className="flex w-full max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center">
                        <VideoUploadCard onVideoSelected={(previewUrl) => setUploadedVideoUrl(previewUrl)} />
                        <AIResultVideoCard />
                    </div>
                    <div className="mt-6 flex w-full justify-center">
                        <button
                            type="button"
                            disabled={!uploadedVideoUrl}
                            className="rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-8 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(239,68,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:shadow-[0_12px_30px_rgba(239,68,68,0.45)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-gray-600 disabled:text-gray-300 disabled:shadow-none disabled:hover:translate-y-0"
                        >
                            Start AI analysis
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}