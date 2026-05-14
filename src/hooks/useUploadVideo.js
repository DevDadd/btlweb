import { useState } from "react";

const API_URL = "http://localhost:3000";

export default function useUploadVideo() {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const uploadVideo = async (file) => {
        if (!file) {
            setUploadError("No file selected");
            return null;
        }

        setUploading(true);
        setUploadError(null);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append("video", file);

            const xhr = new XMLHttpRequest();

            const result = await new Promise((resolve, reject) => {
                xhr.upload.addEventListener("progress", (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round((event.loaded / event.total) * 100);
                        setProgress(percent);
                    }
                });

                xhr.addEventListener("load", () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(xhr.responseText || "Upload failed"));
                    }
                });

                xhr.addEventListener("error", () => reject(new Error("Network error")));
                xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

                xhr.open("POST", `${API_URL}/upload-video`);
                xhr.send(formData);
            });

            setUploadedUrl(result.url);
            setProgress(100);
            return result.url;
        } catch (err) {
            console.error("Upload error:", err);
            setUploadError(err.message || "Upload failed");
            return null;
        } finally {
            setUploading(false);
        }
    };

    const reset = () => {
        setUploading(false);
        setUploadError(null);
        setUploadedUrl(null);
        setProgress(0);
    };

    return { uploadVideo, uploading, uploadError, uploadedUrl, progress, reset };
}
