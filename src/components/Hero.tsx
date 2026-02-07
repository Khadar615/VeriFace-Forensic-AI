import React from 'react';

interface HeroProps {
    onUploadClick: () => void;
    onHowItWorksClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onUploadClick, onHowItWorksClick }) => {
    return (
        <section className="relative py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                        AI-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Deepfake Detection</span> for a Safer Digital World
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl">
                        Detect fake images and videos using advanced machine learning models. Protect yourself from misinformation and digital deception.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={onUploadClick}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 text-sm"
                        >
                            Upload Media
                        </button>
                        <button
                            onClick={onHowItWorksClick}
                            className="px-6 py-3 bg-transparent border-2 border-slate-700 hover:border-slate-500 text-slate-300 font-bold rounded-full transition-all hover:scale-105 active:scale-95 text-sm"
                        >
                            How It Works
                        </button>
                    </div>
                </div>

                <div className="relative flex justify-center items-center animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <div className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
                        {/* Simple SVG Robot as a placeholder for the bot icon in the image */}
                        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                            <rect x="50" y="60" width="100" height="80" rx="20" fill="#E2E8F0" />
                            <rect x="65" y="75" width="70" height="35" rx="10" fill="#1E293B" />
                            <circle cx="85" cy="92" r="5" fill="#60A5FA" />
                            <circle cx="115" cy="92" r="5" fill="#60A5FA" />
                            <rect x="85" y="115" width="30" height="8" rx="4" fill="#1E293B" />
                            <path d="M40 80 L50 85 M160 80 L150 85" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />
                            <circle cx="40" cy="75" r="5" fill="#F43F5E" />
                            <circle cx="160" cy="75" r="5" fill="#F43F5E" />
                            <rect x="80" y="45" width="40" height="15" rx="5" fill="#FBBF24" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
