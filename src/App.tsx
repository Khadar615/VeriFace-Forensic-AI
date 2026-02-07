import React, { useState, useCallback, useRef } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import Modal from './components/Modal';
import HeatmapOverlay from './components/HeatmapOverlay';
import XAIReport from './components/XAIReport';

import { AnalysisResult, MediaType } from './types/types';
import { ForensicService } from './services/geminiService';


const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', icon: null as React.ReactNode });

  const openModal = (title: string, description: string, icon?: React.ReactNode) => {
    setModalContent({ title, description, icon: icon || null });
    setIsModalOpen(true);
  };

  const detectorRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToDetector = () => {
    detectorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      setFile(selectedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Preview generated");
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const runAnalysis = async () => {
    if (!file || !preview) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Data = preview.split(',')[1];
      const mediaType = file.type.startsWith('video') ? MediaType.VIDEO : MediaType.IMAGE;
      const service = new ForensicService();
      const analysis = await service.analyzeMedia(base64Data, file.type, mediaType);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {!result && !isAnalyzing && (
          <>
            <Hero onUploadClick={scrollToDetector} onHowItWorksClick={scrollToHowItWorks} />
            <div id="features"><Features onOpenModal={openModal} /></div>
            <div id="how-it-works"><HowItWorks onOpenModal={openModal} /></div>
            <div id="why-choose-us"><WhyChooseUs onOpenModal={openModal} /></div>
            <div id="tech-stack"><TechStack /></div>
          </>
        )}

        <div ref={detectorRef} className="max-w-7xl mx-auto w-full p-4 md:p-8">
          {!result && !isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center space-y-8 py-12">
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Upload <span className="text-blue-500">Media</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Select an image or video to begin the deep forensic analysis.
                  Our AI will scan for synthetic artifacts and provide evidence-based results.
                </p>
              </div>

              <div className="w-full max-w-4xl">
                <div className="bg-slate-900/50 border-2 border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <input
                    type="file"
                    ref={hiddenFileInput}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                  />

                  <div
                    onClick={handleClick}
                    className="relative z-20 flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-950/40 rounded-3xl cursor-pointer transition-all"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                      <div className="mb-6 p-6 bg-slate-900 rounded-full text-blue-500 shadow-xl shadow-blue-500/10 border border-slate-800 group-hover:scale-110 transition-transform">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" className="text-yellow-500" />
                        </svg>
                      </div>
                      <p className="mb-2 text-xl font-bold text-white">Click or drag media here</p>
                      <p className="text-slate-500 max-w-xs mx-auto text-sm">High-resolution images and videos provide the best results.</p>
                    </div>
                  </div>

                  {preview && (
                    <div className="mt-8 relative z-30 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Media Ready for Scanning
                        </span>
                        <button onClick={reset} className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest">Clear</button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          runAnalysis();
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 px-8 rounded-2xl shadow-2xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-lg uppercase tracking-tight"
                      >
                        ANALYZE NOW
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : isAnalyzing ? (
            <div className="h-[60vh] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-white tracking-tight">Scanning Forensic Evidence...</h3>
              <p className="mt-2 text-slate-400 text-center max-w-sm">
                Our XAI engine is checking for lighting inconsistencies, biological anomalies, and generative artifacts.
              </p>
              <div className="mt-12 flex gap-4">
                {['Eye Gaze', 'Skin Texture', 'Aliasing', 'Reflections'].map((task) => (
                  <div key={task} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    {task}
                  </div>
                ))}
              </div>
            </div>
          ) : result && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in zoom-in-95 duration-700">
              {/* Main Visualizer Area */}
              <div className="lg:col-span-7 space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-3 overflow-hidden shadow-2xl relative group">
                  <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                    <div className={`px-6 py-3 rounded-2xl border-2 backdrop-blur-xl flex items-center gap-4 ${result.isFake
                      ? 'bg-red-500/10 border-red-500/50 text-red-500'
                      : 'bg-green-500/10 border-green-500/50 text-green-500'
                      }`}>
                      <span className="w-4 h-4 bg-current rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></span>
                      <span className="text-2xl font-black uppercase tracking-[0.2em]">{result.isFake ? 'FAKE' : 'REAL'}</span>
                    </div>
                    <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-xl text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                      CONFIDENCE: <span className="text-blue-500 font-mono text-sm ml-1">{Math.round(result.confidence * 100)}%</span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-8 z-20">
                    <button
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className={`p-4 rounded-2xl border transition-all duration-300 shadow-xl ${showHeatmap ? 'bg-blue-600 border-blue-400 text-white shadow-blue-600/30' : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative aspect-[4/3] bg-black rounded-[2rem] overflow-hidden cursor-crosshair shadow-inner">
                    {file?.type.startsWith('video') ? (
                      <video src={preview!} controls className="w-full h-full object-contain" />
                    ) : (
                      <img src={preview!} alt="Analysis target" className="w-full h-full object-contain shadow-2xl" />
                    )}
                    <HeatmapOverlay artifacts={result.artifacts} visible={showHeatmap} activeArtifactId={activeArtifactId} />
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-[2rem] p-8 flex items-center shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={reset}
                      className="p-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all hover:rotate-180 duration-500 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <div>
                      <p className="text-lg font-bold text-white tracking-tight">New Scan</p>
                      <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.1em]">RESETS ANALYSIS DATA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Forensic Report */}
              <div className="lg:col-span-5 h-[calc(100vh-160px)] sticky top-28">
                <XAIReport
                  result={result}
                  onArtifactHover={setActiveArtifactId}
                  activeId={activeArtifactId}
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
              <div className="p-2 bg-red-500 rounded-lg text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-red-500 font-bold text-sm">Forensic Error</h4>
                <p className="text-red-400/80 text-xs mt-1">{error}</p>
                <button onClick={reset} className="mt-2 text-xs font-bold text-white underline underline-offset-4 decoration-red-500">Retry Upload</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        icon={modalContent.icon}
      />
    </div>
  );
};

export default App;
