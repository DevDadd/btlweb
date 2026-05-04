import { useState } from "react";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-2xl">

            {/* Title */}
            <h1 className="mb-2 text-center text-3xl font-bold text-white">
                Welcome back
            </h1>
            <p className="mb-6 text-center text-sm text-white/70">
                Sign in to continue your training journey
            </p>

            {/* Email */}
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-white/90">
                    Email
                </label>
                <div className="flex items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white">
                    <span className="mr-2">📧</span>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-white/90">
                    Password
                </label>
                <div className="flex items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white">
                    <span className="mr-2">🔒</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="ml-2 shrink-0 rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                    >
                        <i
                            className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="mt-2 text-right">
                    <span className="text-red-500 text-sm cursor-pointer">
                        Forgot password?
                    </span>
                </div>
            </div>

            {/* Remember */}
            <div className="mb-6 flex items-center">
                <input type="checkbox" className="mr-2 accent-rose-500" />
                <span className="text-sm text-white/70">
                    Remember me for 30 days
                </span>
            </div>

            {/* Button */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-md hover:opacity-90 transition">
                Sign in →
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-white/20" />
                <span className="mx-3 text-sm text-white/50">OR</span>
                <div className="h-px flex-1 bg-white/20" />
            </div>

            {/* Social */}
            <div className="mb-6 flex gap-3">
                <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-2 text-white hover:bg-white/10"
                >
                    <i className="fab fa-google" aria-hidden="true" />
                    Google
                </button>
                <button 
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-2 text-white hover:bg-white/10"
                >
                    <i className="fab fa-apple" aria-hidden="true" />
                    Apple
                </button>
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-white/70">
                Don't have an account?{" "}
                <span className="text-red-500 font-medium cursor-pointer">
                    Sign up
                </span>
            </p>

        </div>
    );
}
