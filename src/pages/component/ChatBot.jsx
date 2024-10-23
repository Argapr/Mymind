import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatBot() {
    const [inputValue, setInputValue] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);

    const genAI = new GoogleGenerativeAI(
        "AIzaSyCEv_d6s01BmLsJQ1nGF-i7NhSxNWoZvTY"
    );

    useEffect(() => {
        setChatHistory([
            { text: "MindAI Terminal [Version 1.0.190]", isSystem: true },
            { text: "(c) MindAI International LLC. All rights reserved.", isSystem: true },
            { text: "Type 'help' to see available commands.", isSystem: true },
        ]);
        
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleCommand = async (command) => {
        const [cmd, ...args] = command.trim().split(" ");
        const fullArgs = args.join(" ");

        switch (cmd.toLowerCase()) {
            case "help":
                setChatHistory(prev => [...prev, 
                    { text: "Supported commands are:", isSystem: true },
                    { text: "  bot [text]", isSystem: true },
                    { text: "  help", isSystem: true },
                    { text: "  ver", isSystem: true },
                    { text: "  echo [text]", isSystem: true },
                    { text: "  cls", isSystem: true },
                ]);
                break;

            case "ver":
                setChatHistory(prev => [...prev, 
                    { text: "MindAI Terminal [Version 1.0.190]", isSystem: true },
                ]);
                break;

            case "cls":
                setChatHistory([
                    { text: "MindAI Terminal [Version 1.0.190]", isSystem: true },
                    { text: "(c) MindAI International LLC. All rights reserved.", isSystem: true },
                ]);
                break;

            case "echo":
                if (fullArgs) {
                    setChatHistory(prev => [...prev, { text: fullArgs, isSystem: true }]);
                }
                break;

            case "bot":
                if (!fullArgs) {
                    setChatHistory(prev => [...prev, { text: "Error: Please provide text after 'bot' command", isError: true }]);
                    break;
                }
                try {
                    setLoading(true);
                    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                    const result = await model.generateContent(fullArgs);
                    const response = result.response;
                    const text = response.text();
                    setChatHistory(prev => [...prev,
                        { text: `bot : ${text}`, isBot: true }
                    ]);
                } catch (error) {
                    setChatHistory(prev => [...prev, 
                        { text: "Error: Something went wrong with the bot response", isError: true }
                    ]);
                } finally {
                    setLoading(false);
                }
                break;

            default:
                setChatHistory(prev => [...prev, 
                    { text: "Bad command or filename", isError: true }
                ]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            setChatHistory(prev => [...prev, { text: `> ${inputValue}`, isCommand: true }]);
            handleCommand(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="flex flex-col h-[300px] bg-[#0C0C0C] p-2 pt-5 font-monospace text-sm">
            <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto whitespace-pre-wrap"
            >
                {chatHistory.map((message, index) => (
                    <div 
                        key={index}
                        className={`mb-1 ${
                            message.isError ? 'text-[#CCCCCC]' : 
                            message.isCommand ? 'text-[#CCCCCC]' :
                            message.isBot ? 'text-[#CCCCCC]' :
                            message.isUser ? 'text-[#CCCCCC]' :
                            'text-[#CCCCCC]'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
                {loading && <div className="text-[#CCCCCC]"></div>}
                <div className="flex items-center">
                    <span className="text-[#CCCCCC]">{">"}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow ml-2 bg-[#0C0C0C] outline-none text-[#CCCCCC]"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;