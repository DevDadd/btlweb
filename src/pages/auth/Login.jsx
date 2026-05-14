import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background.jsx";
import LoginCard from "../../components/LoginCard.jsx";
import login from "../../hooks/authentication_service.js";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function handleLogin({ username, password }) {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await login(username, password);
      const payloadUser = response?.user || response?.User || null;
      if (payloadUser) {
        localStorage.setItem("auth_user", JSON.stringify(payloadUser));
      }
      if (response?.token) {
        localStorage.setItem("auth_token", response.token);
      }
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <LoginCard
          onSubmit={handleLogin}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
