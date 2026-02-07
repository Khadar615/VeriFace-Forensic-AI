import React from 'react';

const FeatureCard = ({ title, description, icon: Icon, color, onClick }: { title: string; description: string; icon: React.ReactNode; color: string; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/30 transition-all hover:bg-slate-900/80 group cursor-pointer"
    >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${color}-500/10 group-hover:scale-110 transition-transform`}>
            {Icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        <div className="mt-6 flex items-center text-xs font-bold text-indigo-500 uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
    </div>
);

interface FeaturesProps {
    onOpenModal: (title: string, description: string, icon?: React.ReactNode) => void;
}

const Features: React.FC<FeaturesProps> = ({ onOpenModal }) => {
    const features = [
        {
            title: "AI-Driven Analysis",
            description: "Powered by state-of-the-art machine learning models for accurate detection.",
            detail: "Our forensic engine leverages ensembles of Vision Transformers (ViT) and Convolutional Neural Networks (CNN) to detect subtle frequency artifacts left by generative AI. It analyzes facial consistency, skin texture variations, and environmental lighting to determine authenticity.",
            color: "pink",
            icon: (
                <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
            )
        },
        {
            title: "High Accuracy Detection",
            description: "Achieve reliable results with our advanced algorithms.",
            detail: "Tested against datasets like FaceForensics++ and Deepfake Detection Challenge, our system maintains a high F1-score. We continuously update our models to recognize the latest artifacts from GenAI models like Sora, Kling, and advanced GAN architectures.",
            color: "blue",
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
            )
        },
        {
            title: "Fast Processing",
            description: "Quick analysis without compromising on quality.",
            detail: "Our inference pipeline is optimized for speed, utilizing GPU acceleration and model quantization. Most high-resolution images are processed in under 2 seconds, while video forensics occur at near-real-time framerates, allowing for rapid broad-scale verification.",
            color: "yellow",
            icon: (
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
            )
        },
        {
            title: "Secure & Private",
            description: "Your data is processed securely and never stored.",
            detail: "We prioritize your privacy. All uploaded media is processed in encrypted memory silos and is immediately purged after the analysis is complete. We do not use your data for training our models, ensuring complete confidentiality for sensitive forensic tasks.",
            color: "emerald",
            icon: (
                <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Features</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            onClick={() => onOpenModal(feature.title, feature.detail, feature.icon)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
