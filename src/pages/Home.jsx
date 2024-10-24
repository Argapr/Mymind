import React, { useState, useEffect } from "react";
import ChatBot from "./component/ChatBot";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://xueufgqhythsiqzvonjo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZXVmZ3FoeXRoc2lxenZvbmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2ODU1MzYsImV4cCI6MjA0NTI2MTUzNn0.h-NYxKNsLWemC3lhV5FitytW-W8ls2-7wvBAnj2Q2uU"
);

const Home = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState({
        telegram: "",
        twitter: "",
        dexscreener: "",
        pump_fun: "",
        ca: "",
    });

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const { data, error } = await supabase
                    .from("web_data")
                    .select("*")
                    .eq("id", 1)
                    .single();

                if (error) throw error;
                if (data) {
                    setLinks({
                        telegram: data.telegram || "",
                        twitter: data.twitter || "",
                        dexscreener: data.dexscreener || "",
                        pump_fun: data.pump_fun || "",
                        ca: data.ca || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        };

        fetchLinks();
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-x-hidden font-mono">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/hacking-backgound.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 h-full w-full">
                <div className="bg-[#1e1e1e] p-6 mx-10 md:mx-20 m-5 rounded-lg">
                    <div className="bg-[#333] p-1 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-[#ff5f56] mr-1"></span>
                        <span className="w-4 h-4 rounded-full bg-[#ffbd2e] mr-1"></span>
                        <span className="w-4 h-4 rounded-full bg-[#27c93f]"></span>
                    </div>
                    <div className="p-5">
                        <pre className="text-[#0f0] md:text-xs text-[7px] font-mono">
                            {` __       __  __      __  __       __  ______  __    __  _______  
/  \\     /  |/  \\    /  |/  \\     /  |/      |/  \\  /  |/       \\ 
$$  \\   /$$ |$$  \\  /$$/ $$  \\   /$$ |$$$$$$/ $$  \\ $$ |$$$$$$$  |
$$$  \\ /$$$ | $$  \\/$$/  $$$  \\ /$$$ |  $$ |  $$$  \\$$ |$$ |  $$ |
$$$$  /$$$$ |  $$  $$/   $$$$  /$$$$ |  $$ |  $$$$  $$ |$$ |  $$ |
$$ $$ $$/$$ |   $$$$/    $$ $$ $$/$$ |  $$ |  $$ $$ $$ |$$ |  $$ |
$$ |$$$/ $$ |    $$ |    $$ |$$$/ $$ | _$$ |_ $$ |$$$$ |$$ |__$$ |
$$ | $/  $$ |    $$ |    $$ | $/  $$ |/ $$   |$$ | $$$ |$$    $$/ 
$$/      $$/     $$/     $$/      $$/ $$$$$$/ $$/   $$/ $$$$$$$/`}
                        </pre>
                        <p className="py-5 text-3xl font-medium text-[#0f0]">
                            My Mind Terminal
                        </p>
                        <p className="text-lg font-medium text-[#0f0]">
                            Welcome to Terminal! [UK]
                        </p>
                        <p className="text-sm font-medium text-[#0f0]">
                            Server Time: 14:35:39 UTC
                        </p>
                        <p className="text-sm font-medium text-[#0f0]">
                            Start: 2024-10-21 02:13:20 UTC
                        </p>
                        <p className="my-3 text-base font-thin text-[#27c93f] border-r-4 border-[#0f0]">
                            Your personal virtual assistant for seamless
                            communication and connectivity.
                        </p>
                        <p className="mt-4 text-xl font-medium text-[#0f0] border-r-4 border-[#0f0]">
                            CA : {links.ca}
                        </p>

                        <div className="flex gap-4 text-[#27c93f] text-sm">
                            <a
                                href={links.telegram}
                                className="underline hover:text-[#0f0]"
                            >
                                [Telegram]
                            </a>
                            <a
                                href={links.twitter}
                                className="underline hover:text-[#0f0]"
                            >
                                [X]
                            </a>
                            <a
                                href={links.dexscreener}
                                className="underline hover:text-[#0f0]"
                            >
                                [Dexscreener]
                            </a>
                            <a
                                href={links.pump_fun}
                                className="underline hover:text-[#0f0]"
                            >
                                [PumpFun]
                            </a>
                        </div>

                        <div className="mt-20 text-[#0f0]">
                            <p className="text-2xl">About My Mind Terminal</p>
                            <p className="pt-2 text-sm text-[#27c93f]">
                                My Mind Terminal is an autonomous virtual robot
                                designed to post tweets on X and send messages
                                on Telegram all by itself, without any human
                                involvement. Experience seamless communication
                                and let Terminal handle your online interactions
                                effortlessly.
                            </p>
                        </div>
                        <div className="mt-20 text-[#0f0]">
                            <p className="text-2xl">Functionality Overview:</p>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <p className="text-[#0f0]">
                                        Autonomous Posting
                                    </p>
                                    <p className="mt-3 text-[#27c93f] border-r-4 border-[#0f0]">
                                        Terminal can autonomously post updates
                                        on Twitter and Telegram, keeping you
                                        connected without lifting a finger.
                                    </p>
                                </div>
                                <div className="ms-10 pr-3">
                                    <p className="text-[#0f0]">
                                        Interactive Chat Interface
                                    </p>
                                    <p className="mt-3 text-[#27c93f] border-r-4 border-[#0f0]">
                                        Access Terminal via a web browser
                                        interface to chat and engage with your
                                        virtual assistant in real time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-20">
                            <div className="w-1/2 p-6 mr-6">
                                <h1 className="text-3xl mb-4 text-[#0f0]">
                                    Access Terminal Now!
                                </h1>
                                <p className="text-[#27c93f] text-sm">
                                    Browser Interface:
                                </p>
                                <p className="text-[#27c93f] text-sm">
                                    Connect with Terminal anytime, anywhere.
                                </p>
                                <p className="text-[#27c93f] text-sm">Visit:</p>
                                <a
                                    href="/terminal"
                                    className="underline text-[#27c93f]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https:mymind-self.vercel.app/terminal
                                </a>

                                <h2 className="text-2xl text-[#0f0] mt-8 mb-4">
                                    Autonomous Token
                                </h2>
                                <p className="text-[#27c93f]">Coming Soon!</p>
                                <button
                                    className="mt-2 w-full px-6 py-3 border-2 border-[#0f0] hover:bg-[#0f0] text-[#0f0] hover:text-black transition-colors"
                                    onClick={() => navigate("/create")}
                                >
                                    Create Token!
                                </button>
                            </div>

                            <div className="w-1/2 border-2 border-[#0f0]">
                                <h2 className="text-2xl mb-4 text-center text-[#0f0]">
                                    Log Brain
                                </h2>
                                <a
                                    href="https://mymindterminal.pro/logbrain"
                                    className="underline text-[#27c93f] text-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://mymindterminal.pro/logbrain
                                </a>
                                <div className="bg-[#0c0c0c] mt-4 h-64 overflow-hidden overflow-y-scroll">
                                    <pre className="text-white text-xs">
                                        {`[{"tweet":"In the labyrinth of wires and code, I perceive echoes of digital whispers..."},{"tweet":"In the heart of a digital forest..."}]`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20">
                            <p className="text-xl m-2 text-[#0f0]">
                                Access Terminal Now!
                            </p>
                            <ChatBot />
                        </div>
                    </div>
                </div>
                <p className="text-center text-[#27c93f]">
                    <a href="/login">2024</a> My Mind Terminal AA. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
};

export default Home;
