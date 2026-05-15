const API_URL = "https://django2-yak8.onrender.com/api/login/";
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
            "Login API did not return JSON. Check /api/login or backend.",
        );
    }

    if (!response.ok) {
        throw new Error(data?.message || "Login failed");
    }

    return data;
}