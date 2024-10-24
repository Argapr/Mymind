import React, { useState, useEffect } from "react";

const PhantomWallet = () => {
    const [wallet, setWallet] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const checkForPhantom = async () => {
            try {
                if ("solana" in window) {
                    const provider = window.solana;
                    if (provider.isPhantom) {
                        setWallet(provider);
                    }
                }
            } catch (error) {
                setError("Error checking for Phantom wallet");
                console.error(error);
            }
        };

        checkForPhantom();
    }, []);

    const connectWallet = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { publicKey } = await wallet.connect();
            setPublicKey(publicKey.toString());
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = async () => {
        try {
            await wallet.disconnect();
            setPublicKey(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(publicKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            setError("Failed to copy address");
        }
    };

    if (!wallet) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">
                        Phantom wallet is not installed. Please install it from{" "}
                        <a
                            href="https://phantom.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            phantom.app
                        </a>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Phantom Wallet Connection
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {!publicKey ? (
                    <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Connecting...
                            </span>
                        ) : (
                            "Connect Phantom Wallet"
                        )}
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm font-medium mb-1">
                                Connected Address:
                            </p>
                            <div className="flex items-center justify-between">
                                <code className="text-xs break-all">
                                    {publicKey}
                                </code>
                                <button
                                    onClick={copyAddress}
                                    className="ml-2 p-2 hover:bg-gray-200 rounded"
                                >
                                    {copied ? (
                                        <span className="text-green-500">
                                            Copied!
                                        </span>
                                    ) : (
                                        "Copy"
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={disconnectWallet}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhantomWallet;
