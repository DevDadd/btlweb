const EXERCISES_NAME_URL = "https://django2-yak8.onrender.com/api/exercises/names";
export default async function getExercisesName() {
    const response = await fetch(EXERCISES_NAME_URL);
    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        throw new Error("Exercises names API did not return JSON. Check /api/exercises/names or backend.");
    }
    const data = JSON.parse(raw);
    if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch exercise names");
    }
    return data;
}