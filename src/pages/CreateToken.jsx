import React, { useState } from "react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import wallet from "../assets/wallet.png";
import { useNavigate } from "react-router-dom";

const CreateToken = () => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showCustomPK, setShowCustomPK] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        decimals: "6",
        supply: "1000000000",
        description: "",
        image: null,
        immutable: false,
        revokeFreeze: false,
        revokeMint: false,
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: URL.createObjectURL(file),
            }));
        }
    };

    const SpinButton = ({ value, onChange }) => (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
            <button
                className="text-gray-400 hover:text-[#0f0]"
                onClick={() => onChange(Number(value) + 1)}
            >
                <ChevronUp size={16} />
            </button>
            <button
                className="text-gray-400 hover:text-[#0f0]"
                onClick={() => onChange(Math.max(0, Number(value) - 1))}
            >
                <ChevronDown size={16} />
            </button>
        </div>
    );

    const InputField = ({
        label,
        value,
        onChange,
        type = "text",
        className = "",
        spinner = false,
    }) => (
        <div className="space-y-2">
            <label className="text-white font-bold">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full bg-[#1a1a1a] rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#0f0] ${className}`}
                />
                {spinner && (
                    <SpinButton
                        value={value}
                        onChange={(newValue) => onChange(newValue.toString())}
                    />
                )}
            </div>
        </div>
    );

    const ToggleSwitch = ({ label, value, onChange, cost }) => (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-white font-bold">{label}</h3>
                <p className="text-[#0f0] text-sm">+ {cost} SOL</p>
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`w-14 h-7 rounded-full transition-colors duration-200 ease-in-out ${
                    value ? "bg-[#0f0]" : "bg-[#1a1a1a]"
                }`}
            >
                <div
                    className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                        value ? "translate-x-8" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0c0c0c] p-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <InputField
                            label="NAME"
                            value={formData.name}
                            onChange={(val) =>
                                setFormData((prev) => ({ ...prev, name: val }))
                            }
                        />

                        <InputField
                            label="SYMBOL"
                            value={formData.symbol}
                            onChange={(val) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    symbol: val,
                                }))
                            }
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="DECIMALS"
                                value={formData.decimals}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        decimals: val,
                                    }))
                                }
                                spinner
                            />

                            <InputField
                                label="SUPPLY"
                                value={formData.supply}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        supply: val,
                                    }))
                                }
                                spinner
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-white font-bold">
                                    DESCRIPTION
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="w-full h-32 bg-[#1a1a1a] rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#0f0]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-white font-bold">
                                    IMAGE
                                </label>
                                <div className="h-32 bg-[#1a1a1a] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Token"
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                            <Plus className="h-8 w-8 text-[#0f0]" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-[#1a1a1a] p-6 rounded-lg">
                            <h2 className="text-white font-bold text-xl mb-4">
                                Advanced Setup (optional)
                            </h2>

                            <ToggleSwitch
                                label="IMMUTABLE"
                                value={formData.immutable}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        immutable: val,
                                    }))
                                }
                                cost="0.075"
                            />
                            <p className="text-gray-400 text-sm ml-4">
                                Update Authority allows you to update token
                                metadata
                            </p>

                            <ToggleSwitch
                                label="REVOKE FREEZE"
                                value={formData.revokeFreeze}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        revokeFreeze: val,
                                    }))
                                }
                                cost="0.075"
                            />
                            <p className="text-gray-400 text-sm ml-4">
                                Freeze Authority allows you to freeze token
                                accounts
                            </p>

                            <ToggleSwitch
                                label="REVOKE MINT"
                                value={formData.revokeMint}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        revokeMint: val,
                                    }))
                                }
                                cost="0.075"
                            />
                            <p className="text-gray-400 text-sm ml-4">
                                Mint Authority allows you to mint more supply
                            </p>

                            <div className="mt-6 space-y-4 w-full">
                                <DropdownSection
                                    title={
                                        showOptions
                                            ? "Hide options"
                                            : "More options"
                                    }
                                    isOpen={showOptions}
                                    toggle={() => setShowOptions(!showOptions)}
                                >
                                    <InputFieldMore label="WEBSITE URL" />
                                    <InputFieldMore label="TWITTER LINK" />
                                    <InputFieldMore label="TELEGRAM LINK" />
                                </DropdownSection>

                                <DropdownSection
                                    title={
                                        showCustomPK
                                            ? "Use Random PK"
                                            : "Use Custom PK"
                                    }
                                    isOpen={showCustomPK}
                                    toggle={() =>
                                        setShowCustomPK(!showCustomPK)
                                    }
                                >
                                    <InputFieldMore label="CUSTOM PRIVATE KEY" />
                                </DropdownSection>
                            </div>
                        </div>
                        <div className="space-y-4 bg-[#1a1a1a] p-6 rounded-lg">
                            <button
                                className="w-full border border-[#fff] bg-[#0f0] hover:bg-purple-800 text-black py-3 rounded-md font-medium flex items-center justify-center"
                                onClick={() => navigate("/wallet")}
                            >
                                <img
                                    src={wallet}
                                    alt="Logo"
                                    className="h-5 w-5 mr-2"
                                />
                                Connect Wallet
                            </button>

                            <div className="text-center text-sm text-[#fff] font-semibold">
                                Total fees:{" "}
                                <span className="text-green-400">
                                    ~0.075 SOL
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-6 rounded-lg h-fit">
                        <h1 className="text-white text-2xl font-bold mb-6">
                            Create your own Solana Token in 5 minutes
                        </h1>
                        <ol className="space-y-4 text-white">
                            <li>1. Connect your Solana Wallet</li>
                            <li>2. Write the name you want for your Token</li>
                            <li>3. Indicate the symbol (max 8 characters)</li>
                            <li>
                                4. Select the decimals quantity (0 for Whitelist
                                Token, 6 for utility token)
                            </li>
                            <li>5. Put the Supply of your Token</li>
                            <li>
                                6. Write the description you want for your SPL
                                Token
                            </li>
                            <li>7. Upload the image for your token (PNG)</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropdownSection = ({ title, isOpen, toggle, children }) => {
    const handleToggle = (e) => {
        e.preventDefault();
        toggle();
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-center">
                <button
                    onClick={handleToggle}
                    className="bg-[#0f0] text-[#0c0c0c] px-6 py-2 rounded-full flex items-center justify-center space-x-2 font-medium text-sm"
                    type="button"
                >
                    <span>{title}</span>
                    {isOpen ? (
                        <ChevronUp size={16} className="text-[#0c0c0c]" />
                    ) : (
                        <ChevronDown size={16} className="text-[#0c0c0c]" />
                    )}
                </button>
            </div>
            {isOpen && <div className="space-y-4 w-full">{children}</div>}
        </div>
    );
};

const InputFieldMore = ({ label }) => (
    <div className="w-full">
        <label className="block text-xs font-bold mb-2 text-white">
            {label}
        </label>
        <input
            type="text"
            className="w-full p-3 bg-transparent border-2 border-[#0f0] outline-none rounded-2xl text-white"
        />
    </div>
);

export default CreateToken;
