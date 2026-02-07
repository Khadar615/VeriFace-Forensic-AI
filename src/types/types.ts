
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface Artifact {
  id: string;
  type: 'blur' | 'aliasing' | 'lighting' | 'biological' | 'compression';
  location: { x: number; y: number; radius: number };
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  mediaType: MediaType;
  summary: string;
  technicalDetails: string;
  artifacts: Artifact[];
  frames?: FrameAnalysis[];
}

export interface FrameAnalysis {
  timestamp: number;
  confidence: number;
  artifacts: Artifact[];
}

export interface ForensicReport {
  timestamp: string;
  fileName: string;
  result: AnalysisResult;
}
