import React from 'react';

const ChoiceCard = ({ title, description, detail, onClick }: { title: string; description: string; detail: string; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-3xl hover:bg-slate-900/60 hover:border-indigo-500/30 transition-all cursor-pointer group"
    >
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        <div className="mt-6 flex items-center text-xs font-bold text-indigo-500 uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Why
        </div>
    </div>
);

interface WhyChooseUsProps {
    onOpenModal: (title: string, description: string, icon?: React.ReactNode) => void;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenModal }) => {
    const choices = [
        {
            title: "Explainability",
            description: "Understand how our AI makes decisions with detailed forensic reports and heatmaps.",
            detail: "Unlike 'black box' AI systems, VeriFace provides a transparent audit trail. Our XAI (Explainable AI) algorithms highlight manipulated regions in heatmaps and provide technical justifications for every decision, allowing human investigators to verify the findings independently."
        },
        {
            title: "Reliable Results",
            description: "Consistent and trustworthy detection powered by rigorously trained neural networks.",
            detail: "Our models are trained on millions of authentic and manipulated media samples. We simulate real-world conditions like heavy compression, lens distortion, and varied lighting to ensure that our detection remains accurate even in low-quality or highly-filtered footage."
        },
        {
            title: "Academic & Real-World Use",
            description: "Suitable for research, journalistic verification, and practical forensics enterprise applications.",
            detail: "VeriFace is designed for high-stakes environments. Whether you are a journalist verifying a viral video, a researcher studying synthetic media trends, or a corporate security team protecting executive identities, our platform provides the precision and reliability you need."
        }
    ];

    return (
        <section id="why-choose-us" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Why Choose Us</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {choices.map((choice, index) => (
                        <ChoiceCard
                            key={index}
                            {...choice}
                            onClick={() => onOpenModal(choice.title, choice.detail)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
