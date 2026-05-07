const COURSES_DETAIL_URL = "https://django2-yak8.onrender.com/api/courses/";

export default async function getCoursesDetail(courseId) {
    const response = await fetch(`${COURSES_DETAIL_URL}${courseId}/`);
    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        throw new Error(
            "Courses detail API did not return JSON. Check /api/courses/:id/ or backend.",
        );
    }

    const data = JSON.parse(raw);

    if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch course details");
    }

    return data;
}