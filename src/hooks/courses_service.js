const COURSES_URL = "https://django2-yak8.onrender.com/api/courses";

/**
 * Gọi API lấy danh sách courses bằng phương thức GET.
 *
 * @returns {Promise<any>} Dữ liệu JSON trả về từ server.
 */
export default async function getCourses() {
    const response = await fetch(COURSES_URL);
    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        throw new Error(
            "API courses không trả JSON. Kiểm tra lại endpoint /api/courses hoặc backend.",
        );
    }

    const data = JSON.parse(raw);

    if (!response.ok) {
        throw new Error(data?.message || "Lấy danh sách courses thất bại");
    }

    return data;
}
