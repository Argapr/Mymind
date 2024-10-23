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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://xueufgqhythsiqzvonjo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZXVmZ3FoeXRoc2lxenZvbmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2ODU1MzYsImV4cCI6MjA0NTI2MTUzNn0.h-NYxKNsLWemC3lhV5FitytW-W8ls2-7wvBAnj2Q2uU"
);

const UploadToken = () => {
    const [ca, setCa] = useState("");
    const [telegram, setTelegram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [dexscreener, setDexscreener] = useState("");
    const [pumpFun, setPumpFun] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!ca && !telegram && !twitter && !dexscreener && !pumpFun) {
            alert("Please fill at least one field before submitting.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from("web_data")
            .update({
                ca: ca || "defaultValue", // Set default value if ca is empty
                telegram: telegram || "#", // Default link as #
                twitter: twitter || "#",
                dexscreener: dexscreener || "#",
                pump_fun: pumpFun || "#",
            })
            .eq("id", "1")
            .select();
        setLoading(false);

        if (error) {
            setFeedback("Error updating data.");
            console.error("Error:", error);
        } else {
            setFeedback("Data updated successfully!");
            navigate("/", {
                state: { telegram, twitter, dexscreener, pumpFun, ca },
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#0c0c0c] p-6">
            <div className="absolute top-4 right-4 group">
                <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-[#1a1a1a] hover:bg-red-600/20 transition-all"
                >
                    <LogOut className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors" />
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
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-300">
                            <BarChart3 className="h-4 w-4 mr-2 text-[#0f0]" />
                            CA
                        </label>
                        <input
                            type="text"
                            value={ca}
                            onChange={(e) => setCa(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-gray-800 
                  text-white placeholder-gray-500 focus:outline-none 
                  focus:ring-2 focus:ring-[#0f0] focus:border-transparent
                  transition-all duration-200"
                            placeholder="Enter CA details"
                        />
                    </div>

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
                        disabled={loading}
                        className="w-full py-3 px-4 bg-[#0f0]"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    {feedback && (
                        <p className="text-center text-sm">{feedback}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadToken;
