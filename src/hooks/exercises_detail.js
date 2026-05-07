const EXERCISES_DETAIL_URL = "https://django2-yak8.onrender.com/api/exercises/";
export default async function getExercisesDetail(exerciseId) {
  const response = await fetch(`${EXERCISES_DETAIL_URL}${exerciseId}/`);
  const raw = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      "Exercise detail API did not return JSON. Check /api/exercises/:id/ or backend.",
    );
  }

  const data = JSON.parse(raw);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch exercise details");
  }

  return data?.data ?? data;
}