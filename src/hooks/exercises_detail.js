const EXERCISES_DETAIL_URL = "https://django2-yak8.onrender.com/api/exercises/";

/**
 * Gọi API lấy chi tiết bài tập bằng phương thức GET.
 *
 * @param {string} exerciseId
 * @returns {Promise<any>} Dữ liệu JSON trả về từ server.
 */
export default async function getExercisesDetail(exerciseId) {
  const response = await fetch(`${EXERCISES_DETAIL_URL}${exerciseId}/`);
  const raw = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      "API exercise detail không trả JSON. Kiểm tra lại endpoint /api/exercises/:id/ hoặc backend.",
    );
  }

  const data = JSON.parse(raw);

  if (!response.ok) {
    throw new Error(data?.message || "Lấy chi tiết bài tập thất bại");
  }

  return data?.data ?? data;
}