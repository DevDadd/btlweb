import { useEffect } from "react";
import Background from "../components/Background.jsx";
import LoginCard from "../components/LoginCard.jsx";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="relative min-h-screen">
        <Background/>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <LoginCard />
      </div>
    </div>
  );
}