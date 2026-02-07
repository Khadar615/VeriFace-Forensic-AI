import React from 'react';

const Step = ({ number, title, description, onClick }: { number: number; title: string; description: string; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group cursor-pointer hover:border-indigo-500/30 transition-all"
    >
        <div className="relative z-10 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
            {number}
        </div>
        <h3 className="relative z-10 text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{description}</p>
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <span className="text-8xl font-black text-white">{number}</span>
        </div>
        <div className="mt-4 flex items-center text-xs font-bold text-indigo-500 uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Read Details
        </div>
    </div>
);

interface HowItWorksProps {
    onOpenModal: (title: string, description: string, icon?: React.ReactNode) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenModal }) => {
    const steps = [
        {
            number: 1,
            title: "Upload Image/Video",
            description: "Select and upload your media file securely to our forensic engine.",
            detail: "Our platform supports a wide range of formats including JPEG, PNG, MP4, and MOV. Once you select a file, it is automatically converted into a compatible format for our analysis engine. We ensure that the original metadata is preserved for deep forensic scanning."
        },
        {
            number: 2,
            title: "AI Model Analysis",
            description: "Our AI analyzes the content using deep learning techniques to find inconsistencies.",
            detail: "The analysis phase involves passing your media through several specialized neural layers. We check for GAN-generated noise patterns, face-swap mask boundaries, and lip-sync temporal inconsistencies. Our 'Explainable AI' (XAI) engine highlights exactly which frames or pixels triggered the detection."
        },
        {
            number: 3,
            title: "Real-Time Result",
            description: "Get instant results with a probability score and localized artifacts detection.",
            detail: "Within seconds, you'll receive a comprehensive forensic dashboard. It includes an overall 'Authenticity Score', a breakdown of detected artifacts (like 'Biological Inconsistency' or 'Compression Artifacts'), and an interactive heatmap that shows where the manipulation likely occurred."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">How It Works</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <Step
                            key={step.number}
                            {...step}
                            onClick={() => onOpenModal(step.title, step.detail, (
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {step.number}
                                </div>
                            ))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
