const COURSES_URL = "https://django2-yak8.onrender.com/api/courses";
export default async function getCourses() {
    const response = await fetch(COURSES_URL);
    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        throw new Error(
            "Courses API did not return JSON. Check /api/courses or backend.",
        );
    }

    const data = JSON.parse(raw);

    if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch courses");
    }

    return data;
}
