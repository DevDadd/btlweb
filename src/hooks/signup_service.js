const SIGNUP_URLS = [
  "https://django2-yak8.onrender.com/api/signup/",
];
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
    if (!contentType.includes("application/json")) {
      lastResponse = response;
      continue;
    }

    const data = JSON.parse(raw);
    if (!response.ok) {
      throw new Error(data?.message || "Signup failed");
    }
    return data;
  }

  throw new Error(
    `Signup API did not return JSON (status ${lastResponse?.status ?? "?"}). Check backend URL: /api/signup or /api/signup/.`,
  );
}
