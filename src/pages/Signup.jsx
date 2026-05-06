import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupCard from "../components/SignupCard";
import Background from "../components/Background.jsx";
import signup from "../hooks/signup_service.js";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup";
  }, []);

  async function handleSignup({ username, password, email }) {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signup(username, password, email);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Đăng ký thất bại");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <SignupCard
          onSubmit={handleSignup}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}