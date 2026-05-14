import { useState, useRef, useEffect } from "react";
import AppBar from "../../components/AppBar";
import Background from "../../components/Background";
import VideoUploadCard from "../../components/VideoUploadCard";
import AIResultVideoCard from "../../components/AIResultVideoCard";
import useUploadVideo from "../../hooks/useUploadVideo";

const STORAGE_KEY = "upload_video_analysis_state";

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
    const [jobId, setJobId] = useState(null);
    const [analysisStatus, setAnalysisStatus] = useState("");
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [resultUrl, setResultUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const videoFileRef = useRef(null);

    const { uploadVideo, uploading, uploadError, uploadedUrl, progress, reset } =
        useUploadVideo();

    const clearSavedAnalysisState = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            if (saved.uploadedVideoUrl) setUploadedVideoUrl(saved.uploadedVideoUrl);
            if (saved.selectedExercise) setSelectedExercise(saved.selectedExercise);
            if (saved.jobId) setJobId(saved.jobId);
            if (saved.analysisStatus) setAnalysisStatus(saved.analysisStatus);
            if (typeof saved.analysisProgress === "number") setAnalysisProgress(saved.analysisProgress);
            if (saved.resultUrl) setResultUrl(saved.resultUrl);
            if (typeof saved.isProcessing === "boolean") setIsProcessing(saved.isProcessing);
        } catch (err) {
            console.error("Failed to restore upload state:", err);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                uploadedVideoUrl,
                selectedExercise,
                jobId,
                analysisStatus,
                analysisProgress,
                resultUrl,
                isProcessing,
            })
        );
    }, [uploadedVideoUrl, selectedExercise, jobId, analysisStatus, analysisProgress, resultUrl, isProcessing]);

    useEffect(() => {
        let intervalId;

        const checkStatus = async () => {
            if (!jobId) return;

            try {
                const response = await fetch(`https://django2-yak8.onrender.com/api/analysis/${jobId}/status/`);
                const data = await response.json();

                if (data.success) {
                    if (data.status === "processing") {
                        setAnalysisStatus("AI is analyzing your video...");
                        if (data.progress !== undefined && data.progress !== null) {
                            setAnalysisProgress(data.progress);
                        } else {
                            // Simulate progress asymptotically approaching 95% if backend doesn't provide progress
                            setAnalysisProgress(prev => {
                                const newProgress = prev + (95 - prev) * 0.15;
                                return newProgress > 95 ? 95 : newProgress;
                            });
                        }
                    } else if (data.result_url || data.status === "completed") {
                        setAnalysisStatus("Analysis completed successfully!");
                        setAnalysisProgress(100);
                        setResultUrl(data.result_url);
                        setIsProcessing(false);
                        clearSavedAnalysisState();
                        clearInterval(intervalId);
                    } else if (data.status === "failed") {
                        setAnalysisStatus("Analysis failed. Please try again.");
                        setAnalysisProgress(0);
                        setIsProcessing(false);
                        clearInterval(intervalId);
                    }
                }
            } catch (err) {
                console.error("Error checking status:", err);
            }
        };

        if (jobId && isProcessing) {
            intervalId = setInterval(checkStatus, 3000);
            checkStatus(); // Run immediately
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [jobId, isProcessing]);

    const handleVideoSelected = (previewUrl, file) => {
        setUploadedVideoUrl(previewUrl);
        videoFileRef.current = file;
        setResultUrl("");
        setJobId(null);
        setAnalysisStatus("");
        setAnalysisProgress(0);
        setIsProcessing(false);
        clearSavedAnalysisState();
    };

    const handleStartAnalysis = async () => {
        if (!videoFileRef.current) return;

        if (!selectedExercise) {
            alert("Please select an exercise first!");
            return;
        }

        setAnalysisStatus("");
        setAnalysisProgress(0);
        setResultUrl("");
        setIsProcessing(true);

        const url = await uploadVideo(videoFileRef.current);
        if (url) {
            console.log("Video uploaded to R2:", url);
            setAnalysisStatus("Sending request to AI server...");
            setAnalysisProgress(5); // Initial progress after upload

            try {
                const response = await fetch("https://django2-yak8.onrender.com/api/analysis/upload/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        video_url: url,
                        exercise: selectedExercise,
                        mode: "video",
                        user_id: "user123",
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // If backend returned a job_id, use it and start polling
                    if (data.job_id) {
                        console.log("job_id from API:", data.job_id);
                        setJobId(data.job_id);
                        setAnalysisStatus(`Analysis started successfully! Waiting for results...`);
                        setAnalysisProgress(10); // Ready to start polling
                    } else if (data.result_url) {
                        // Backend returned final result immediately (no async job)
                        console.log("result_url from API:", data.result_url);
                        setResultUrl(data.result_url);
                        setAnalysisStatus("Analysis completed successfully!");
                        setAnalysisProgress(100);
                        setJobId(null);
                        setIsProcessing(false);
                        clearSavedAnalysisState();
                    } else {
                        // Success but neither job_id nor result_url — treat as unknown
                        setAnalysisStatus(`Analysis started (no job id returned).`);
                        setAnalysisProgress(10);
                    }
                } else {
                    setAnalysisStatus(`Failed to start analysis: ${data.message || 'Unknown error'}`);
                    setIsProcessing(false);
                }
            } catch (err) {
                console.error("API Error:", err);
                setAnalysisStatus("Failed to contact AI server. Please try again.");
                setIsProcessing(false);
            }
        } else {
            setIsProcessing(false);
        }
    };

    const getButtonText = () => {
        if (uploading) return `Uploading... ${progress}%`;
        if (isProcessing && jobId) return `Analyzing... ${Math.round(analysisProgress)}%`;
        if (uploadedUrl && !resultUrl) return "✓ Uploaded — Start AI analysis";
        if (resultUrl) return "Re-analyze video";
        return "Start AI analysis";
    };

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
                        <VideoUploadCard onVideoSelected={handleVideoSelected} />
                        <AIResultVideoCard videoUrl={resultUrl} isProcessing={isProcessing || uploading} />
                    </div>

                    {/* Upload progress bar */}
                    {uploading && (
                        <div className="mt-4 w-full max-w-xl">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-1 text-center text-xs text-gray-400">
                                Uploading to cloud... {progress}%
                            </p>
                        </div>
                    )}

                    {/* Upload error */}
                    {uploadError && (
                        <div className="mt-4 w-full max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-300">
                            ⚠ {uploadError}
                        </div>
                    )}

                    {/* Analysis Status with Progress Bar */}
                    {analysisStatus && (
                        <div className="mt-4 w-full max-w-xl rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-center text-sm text-blue-200">
                            <p className="font-semibold">{analysisStatus}</p>
                            {isProcessing && jobId && (
                                <div className="mt-3 w-full">
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-blue-900/30">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
                                            style={{ width: `${Math.round(analysisProgress)}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-blue-300/80">
                                        {Math.round(analysisProgress)}%
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-6 flex w-full justify-center">
                        <button
                            type="button"
                            disabled={!uploadedVideoUrl || uploading || (isProcessing && jobId)}
                            onClick={handleStartAnalysis}
                            className="rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-8 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(239,68,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:shadow-[0_12px_30px_rgba(239,68,68,0.45)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-gray-600 disabled:text-gray-300 disabled:shadow-none disabled:hover:translate-y-0"
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
