import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Send,
    MessageCircle,
    Twitter,
    BarChart3,
    Rocket,
    LogOut,
} from "lucide-react";

const UploadToken = () => {
    const [telegram, setTelegram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [dexscreener, setDexscreener] = useState("");
    const [pumpFun, setPumpFun] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/", {
            state: {
                telegram,
                twitter,
                dexscreener,
                pumpFun,
            },
        });
    };

    useEffect(() => {
        const handlePopState = (e) => {
            e.preventDefault();
            // Optional: Show confirmation dialog
            const confirmExit = window.confirm(
                "Are you sure you want to leave this page?"
            );
            if (confirmExit) {
                // Clear authentication and redirect to login
                localStorage.removeItem("isAuthenticated");
                navigate("/login", { replace: true });
            }
        };

        window.addEventListener("popstate", handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    useEffect(() => {
        return () => {
            // Optional: Clear authentication on component unmount
            // localStorage.removeItem('isAuthenticated');
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#0c0c0c] p-6">
            <div className="absolute top-4 right-4 group">
                <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-[#1a1a1a] hover:bg-red-600/20 
                             transition-all duration-300 ease-in-out
                             group-hover:rotate-12 relative"
                    aria-label="Logout"
                >
                    <LogOut
                        className="h-6 w-6 text-gray-400 group-hover:text-red-500 
                                 transition-colors duration-300"
                    />
                    {/* Tooltip */}
                    <span
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                                   px-2 py-1 bg-gray-900 text-white text-xs rounded-md 
                                   opacity-0 group-hover:opacity-100 transition-opacity 
                                   whitespace-nowrap pointer-events-none"
                    >
                        Logout
                    </span>
                </button>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#0f0]/10 flex items-center justify-center">
                        <Send className="h-6 w-6 text-[#0f0]" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Upload Token
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Please fill in all required information
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-[#1a1a1a] p-8 rounded-xl shadow-xl"
                >
                    <div className="space-y-4">
                        {/* Telegram Input */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <MessageCircle className="h-4 w-4 mr-2 text-[#0f0]" />
                                Telegram
                            </label>
                            <input
                                type="text"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-gray-800 
                                         text-white placeholder-gray-500 focus:outline-none 
                                         focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                                         transition-all duration-200"
                                placeholder="Enter Telegram link"
                            />
                        </div>

                        {/* Twitter Input */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <Twitter className="h-4 w-4 mr-2 text-[#0f0]" />
                                Twitter
                            </label>
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-gray-800 
                                         text-white placeholder-gray-500 focus:outline-none 
                                         focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                                         transition-all duration-200"
                                placeholder="Enter Twitter link"
                            />
                        </div>

                        {/* Dexscreener Input */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <BarChart3 className="h-4 w-4 mr-2 text-[#0f0]" />
                                Dexscreener
                            </label>
                            <input
                                type="text"
                                value={dexscreener}
                                onChange={(e) => setDexscreener(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-gray-800 
                                         text-white placeholder-gray-500 focus:outline-none 
                                         focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                                         transition-all duration-200"
                                placeholder="Enter Dexscreener link"
                            />
                        </div>

                        {/* Pump Fun Input */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-300">
                                <Rocket className="h-4 w-4 mr-2 text-[#0f0]" />
                                Pump Fun
                            </label>
                            <input
                                type="text"
                                value={pumpFun}
                                onChange={(e) => setPumpFun(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-gray-800 
                                         text-white placeholder-gray-500 focus:outline-none 
                                         focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                                         transition-all duration-200"
                                placeholder="Enter Pump Fun details"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-[#0f0] hover:bg-[#0f0]/90
                                 text-black font-medium focus:outline-none focus:ring-2 
                                 focus:ring-offset-2 focus:ring-[#0f0] focus:ring-offset-[#0c0c0c]
                                 transition-all duration-200 shadow-lg shadow-[#0f0]/20
                                 flex items-center justify-center space-x-2"
                    >
                        <span>Submit</span>
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadToken;
