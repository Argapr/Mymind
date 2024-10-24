import React, { useState, useEffect } from "react";

const PhantomWallet = () => {
    const [wallet, setWallet] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [checkingPhantom, setCheckingPhantom] = useState(true);

    useEffect(() => {
        const checkForPhantom = async () => {
            setCheckingPhantom(true);
            try {
                // Wait for Phantom to be injected
                let tries = 0;
                const maxTries = 10;

                const checkInterval = setInterval(() => {
                    tries++;

                    if ("solana" in window) {
                        const provider = window.solana;
                        if (provider.isPhantom) {
                            setWallet(provider);
                            clearInterval(checkInterval);
                            setCheckingPhantom(false);
                        }
                    }

                    if (tries >= maxTries) {
                        clearInterval(checkInterval);
                        setCheckingPhantom(false);
                    }
                }, 500);

                return () => clearInterval(checkInterval);
            } catch (error) {
                setError("Error checking for Phantom wallet");
                console.error(error);
                setCheckingPhantom(false);
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

    const handleInstallClick = () => {
        window.open("https://phantom.app/", "_blank");
    };

    if (checkingPhantom) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-600 animate-bounce" />
                    <span className="text-gray-600">
                        Checking for Phantom wallet...
                    </span>
                </div>
            </div>
        );
    }

    if (!wallet) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">
                                Phantom Not Detected
                            </h3>
                            <p className="mt-2 text-sm text-red-700">
                                We couldn't detect the Phantom wallet. Please
                                ensure:
                            </p>
                        </div>
                        <ul className="list-disc pl-5 text-sm text-red-700 space-y-2">
                            <li>
                                Phantom extension is installed in your browser
                            </li>
                            <li>
                                You're using a supported browser (Chrome,
                                Firefox, Brave, or Edge)
                            </li>
                            <li>The extension is enabled</li>
                            <li>Try refreshing the page</li>
                        </ul>
                        <button
                            onClick={handleInstallClick}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Install Phantom Wallet
                        </button>
                    </div>
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
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {!publicKey ? (
                    <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <div className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                Connecting...
                            </span>
                        ) : (
                            "Connect Phantom Wallet"
                        )}
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium mb-1 text-gray-700">
                                Connected Address:
                            </p>
                            <div className="flex items-center justify-between">
                                <code className="text-xs break-all text-gray-600">
                                    {publicKey}
                                </code>
                                <button
                                    onClick={copyAddress}
                                    className="ml-2 p-2 hover:bg-gray-200 rounded transition-colors"
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
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
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
