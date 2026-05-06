const API_URL = "https://django2-yak8.onrender.com/api/login/";

/**
 * Gọi API login bằng POST và gửi JSON body.
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any>} Dữ liệu JSON trả về từ server.
 */
export default async function login(username, password) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";
    let data = null;

    if (contentType.includes("application/json")) {
        data = JSON.parse(raw);
    } else {
        throw new Error(
            "API login không trả JSON. Kiểm tra lại endpoint /api/login hoặc backend.",
        );
    }

    if (!response.ok) {
        throw new Error(data?.message || "Đăng nhập thất bại");
    }

    return data;
}