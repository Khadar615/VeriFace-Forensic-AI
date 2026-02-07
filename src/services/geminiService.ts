import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, MediaType } from "../types/types";

/* ---------- SCHEMA DEFINITIONS ---------- */

const artifactSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    type: { type: Type.STRING },
    location: {
      type: Type.OBJECT,
      properties: {
        x: { type: Type.NUMBER },
        y: { type: Type.NUMBER },
        radius: { type: Type.NUMBER }
      },
      required: ["x", "y", "radius"]
    },
    description: { type: Type.STRING },
    severity: { type: Type.STRING }
  },
  required: ["id", "type", "location", "description", "severity"]
};

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    isFake: { type: Type.BOOLEAN },
    confidence: { type: Type.NUMBER },
    summary: { type: Type.STRING },
    technicalDetails: { type: Type.STRING },
    artifacts: {
      type: Type.ARRAY,
      items: artifactSchema
    }
  },
  required: [
    "isFake",
    "confidence",
    "summary",
    "technicalDetails",
    "artifacts"
  ]
};

/* ---------- SERVICE ---------- */

export class ForensicService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is missing in .env.local");
    }

    this.ai = new GoogleGenAI({
      apiKey,
      apiVersion: "v1beta"
    });
  }

  async analyzeMedia(
    base64Data: string,
    mimeType: string,
    mediaType: MediaType
  ): Promise<AnalysisResult> {
    console.log(`[ForensicService] Starting analysis for ${mediaType} (${mimeType})`);

    const prompt = `
      You are a world-class digital forensics AI. 
      Analyze the provided ${mediaType} for evidence of synthetic manipulation (Deepfakes, GANs, etc.).
      
      Output ONLY a JSON object with this exact structure:
      {
        "isFake": boolean,
        "confidence": number (between 0 and 1),
        "summary": "string",
        "technicalDetails": "string",
        "artifacts": [
          {
            "id": "string",
            "type": "blur" | "aliasing" | "lighting" | "biological" | "compression",
            "location": { "x": number, "y": number, "radius": number },
            "description": "string",
            "severity": "low" | "medium" | "high"
          }
        ]
      }
      
      Coordinates (x, y, radius) must be percentages (0-100).
    `;

    try {
      // Use the verified model ID for v1beta
      const modelId = "gemini-flash-latest";
      console.log(`[ForensicService] Using model: ${modelId}`);

      const response = await this.ai.models.generateContent({
        model: modelId,
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: base64Data,
                  mimeType
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: analysisSchema
        }
      });

      console.log("[ForensicService] Received response from model");

      let rawText = "";

      // Defensively check for text in various ways
      if (typeof response.text === 'function') {
        rawText = await (response as any).text();
      } else if (typeof response.text === 'string') {
        rawText = response.text;
      } else {
        // Nested candidates check
        const candidate = response.candidates?.[0];
        const part = candidate?.content?.parts?.[0];
        if (part && 'text' in part) {
          rawText = (part as any).text || "";
        }
      }

      if (!rawText) {
        console.error("[ForensicService] No text found in response:", response);
        throw new Error("The AI provided an empty forensic report.");
      }

      console.log("[ForensicService] Raw text acquired, cleaning and parsing...");
      const cleanJson = rawText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      console.log("[ForensicService] Success! Result:", parsed.isFake ? "FAKE" : "REAL", `(${Math.round(parsed.confidence * 100)}%)`);

      return {
        isFake: !!parsed.isFake,
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
        mediaType,
        summary: parsed.summary || (parsed.isFake ? "Manipulation detected." : "No manipulation detected."),
        technicalDetails: parsed.technicalDetails || "",
        artifacts: Array.isArray(parsed.artifacts) ? parsed.artifacts : []
      };
    } catch (err: any) {
      console.error("[ForensicService] ERROR:", err);
      throw new Error(err?.message || "Forensic analysis failed. The AI engine might be busy.");
    }
  }
}
