import React from 'react';

const TechStack: React.FC = () => {
    const techs = ["React", "TypeScript", "Vite", "Tailwind CSS", "GoogleGen AI", "Node.js"];

    return (
        <section id="tech-stack" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Technology Stack</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-12"></div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {techs.map((tech) => (
                            <span
                                key={tech}
                                className="px-6 py-3 bg-slate-900 border border-slate-800 text-blue-400 font-bold rounded-full hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
