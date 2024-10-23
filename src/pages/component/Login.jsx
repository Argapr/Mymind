import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

const Login = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/upload";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "imahcoding") {
            // Set authentication status
            localStorage.setItem("isAuthenticated", "true");
            // Navigate to the protected page they tried to visit
            navigate(from, { replace: true });
        } else {
            alert("Login gagal. Periksa password Anda.");
        }
    };

    React.useEffect(() => {
        const isAuthenticated =
            localStorage.getItem("isAuthenticated") === "true";
        if (isAuthenticated) {
            navigate("/upload", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c] p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#0f0]/10 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-[#0f0]" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Please enter your credentials
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-800 
                                     text-white placeholder-gray-500 focus:outline-none 
                                     focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                                     transition-all duration-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-[#0f0] hover:bg-[#0f0]/90
                                 text-black font-medium focus:outline-none focus:ring-2 
                                 focus:ring-offset-2 focus:ring-[#0f0] focus:ring-offset-[#0c0c0c]
                                 transition-all duration-200 shadow-lg shadow-[#0f0]/20"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
