const SIGNUP_URLS = [
  "https://django2-yak8.onrender.com/api/signup/",
];

/**
 * Gọi API signup bằng POST và gửi JSON body.
 *
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<any>} Dữ liệu JSON trả về từ server.
 */
export default async function signup(username, password, email) {
  let lastResponse = null;

  for (const url of SIGNUP_URLS) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";

    // Django often redirects /api/signup <-> /api/signup/
    // If redirected to an HTML page, try the next candidate URL.
    if (!contentType.includes("application/json")) {
      lastResponse = response;
      continue;
    }

    const data = JSON.parse(raw);
    if (!response.ok) {
      throw new Error(data?.message || "Đăng ký thất bại");
    }
    return data;
  }

  throw new Error(
    `API signup không trả JSON (status ${lastResponse?.status ?? "?"}). Kiểm tra URL backend: /api/signup hoặc /api/signup/.`,
  );
}
