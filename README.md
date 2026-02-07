# VeriFace Forensic AI

A cutting-edge web application that uses artificial intelligence and explainable AI (XAI) to detect deepfakes and manipulated media content. VeriFace leverages Google's Gemini API to analyze images and videos with transparency, providing detailed forensic analysis and confidence scores.

## 🎯 Features

- **Deepfake Detection**: Analyzes media content to detect AI-generated or manipulated content with high accuracy
- **Explainable AI (XAI)**: Generates detailed reports explaining why content is flagged as fake or authentic
- **Heatmap Overlays**: Visual representation of suspicious regions in images, highlighting areas of concern
- **Artifact Detection**: Identifies specific artifacts and anomalies in media (pixel irregularities, temporal inconsistencies, etc.)
- **Confidence Scoring**: Provides confidence percentages for each analysis result
- **Support for Multiple Formats**: Analyze both images and videos
- **Interactive UI**: User-friendly interface with modal dialogs and real-time analysis results
- **Severity Classification**: Artifacts are classified by severity level (low, medium, high, critical)

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **AI Model**: Google Gemini API (@google/genai)
- **Styling**: CSS with custom components
- **Development**: Node.js with npm

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Google Gemini API Key** (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khadar615/VeriFace-Forensic-AI.git
   cd D2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
D2/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Landing hero section
│   │   ├── Features.tsx      # Features showcase
│   │   ├── HowItWorks.tsx    # How the system works
│   │   ├── WhyChooseUs.tsx   # Value proposition
│   │   ├── TechStack.tsx     # Technology details
│   │   ├── HeatmapOverlay.tsx# Visual heatmap component
│   │   ├── XAIReport.tsx     # Explainable AI report display
│   │   ├── Modal.tsx         # Modal dialog component
│   │   └── Footer.tsx        # Footer component
│   ├── services/
│   │   └── geminiService.ts  # Gemini API integration
│   ├── types/
│   │   └── types.ts          # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite environment types
├── public/
│   └── favicon.ico
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── index.html                # HTML entry point
```

## 🔍 How It Works

1. **Upload Media**: Users upload an image or video file through the web interface
2. **Processing**: The file is sent to the Gemini API for analysis
3. **Analysis**: The AI model analyzes the media for signs of manipulation or deepfakes
4. **Results**: The system returns:
   - **Authenticity Score**: Whether the media is fake or authentic
   - **Confidence Level**: How confident the analysis is (0-100%)
   - **Artifacts**: Specific suspicious regions with severity levels
   - **Explanation**: Detailed report explaining the findings
5. **Visualization**: Results are displayed with interactive heatmap overlays

## 🛠️ API Integration

### Gemini Service
The `geminiService.ts` file handles all communication with the Google Gemini API:

```typescript
import { ForensicService } from './services/geminiService';

// Initialize the service with your API key
const service = new ForensicService(apiKey);

// Analyze media
const result = await service.analyzeMedia(file, mediaType);
```

### Response Format
```typescript
{
  isFake: boolean;
  confidence: number;
  explanation: string;
  artifacts: {
    id: string;
    type: string;
    location: { x: number; y: number; radius: number };
    description: string;
    severity: string;
  }[];
  recommendations: string[];
}
```

## 🎨 Components

### Key Components

- **HeatmapOverlay**: Displays visual indicators of suspicious regions in media
- **XAIReport**: Shows detailed explainable AI analysis results
- **Modal**: Interactive dialog for displaying additional information
- **Header/Footer**: Navigation and branding

## 🔐 Security & Privacy

- API keys are stored in environment variables and never exposed in code
- Media files are processed through Google's secure servers
- Results are displayed locally without persistent storage

## 📊 Analysis Criteria

The forensic AI analyzes multiple factors:

- **Facial Recognition Artifacts**: Unnatural eye reflections, skin texture inconsistencies
- **Temporal Anomalies**: Frame-to-frame inconsistencies in videos
- **Compression Artifacts**: Signs of AI-generated content compression patterns
- **Edge Inconsistencies**: Unnatural boundaries and transitions
- **Metadata Analysis**: File integrity and timestamps

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Khadar** - [@Khadar615](https://github.com/Khadar615)

## 📞 Support

For issues, questions, or suggestions, please open an [issue](https://github.com/Khadar615/VeriFace-Forensic-AI/issues) on GitHub.

## 🙏 Acknowledgments

- Google Gemini API for providing powerful AI capabilities
- React and Vite communities for excellent tools
- All contributors and users of VeriFace

## ⚠️ Disclaimer

VeriFace is a tool to assist in media verification. While it provides sophisticated analysis, no AI system is 100% accurate. Results should be considered as one part of a comprehensive media verification process, not as definitive proof.


**Last Updated**: February 2026
