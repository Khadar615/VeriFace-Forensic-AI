
import React from 'react';
import { Artifact, AnalysisResult } from '../types/types';

interface XAIReportProps {
  result: AnalysisResult;
  onArtifactHover: (id: string | null) => void;
  activeId: string | null;
}

const XAIReport: React.FC<XAIReportProps> = ({ result, onArtifactHover, activeId }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 shadow-2xl h-full overflow-y-auto backdrop-blur-md">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          Forensic Reasoning
        </h2>
        <span className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          XAI Engine v1.0
        </span>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50 group hover:border-blue-500/30 transition-colors">
          <h3 className="text-xs font-black text-slate-500 mb-3 uppercase tracking-[0.2em]">Classification Summary</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{result.summary}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Detected Artifacts ({result.artifacts.length})</h3>
          {result.artifacts.map((art) => (
            <div
              key={art.id}
              onMouseEnter={() => onArtifactHover(art.id)}
              onMouseLeave={() => onArtifactHover(null)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-default ${activeId === art.id
                  ? 'bg-blue-600/10 border-blue-500/50 translate-x-1'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tight ${art.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    art.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-500'
                  }`}>
                  {art.type} - {art.severity} risk
                </span>
                <span className="text-[10px] text-slate-600 font-mono tracking-tighter">
                  LOC: {Math.round(art.location.x)}%, {Math.round(art.location.y)}%
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{art.description}</p>
            </div>
          ))}
        </div>

        {result.technicalDetails && (
          <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <h3 className="text-xs font-black text-blue-400/80 mb-3 uppercase tracking-[0.2em]">Technical Forensics</h3>
            <p className="text-xs text-slate-500 font-mono leading-relaxed whitespace-pre-wrap">
              {result.technicalDetails}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default XAIReport;
