import dotenv from "dotenv";
dotenv.config(); // ✅ ensures .env is read before process.env is accessed

import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env file.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// ✅ Define structured JSON schema for resume analysis
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    atsCompatibility: {
      type: Type.OBJECT,
      properties: {
        isCompatible: { type: Type.BOOLEAN },
        score: { type: Type.INTEGER },
        feedback: { type: Type.STRING },
      },
    },
    roleDetection: {
      type: Type.OBJECT,
      properties: {
        currentRole: { type: Type.STRING },
        targetRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    recommendedRoles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["match", "stretch"] },
          reasoning: { type: Type.STRING },
        },
      },
    },
    skillAnalysis: {
      type: Type.OBJECT,
      properties: {
        hardSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        toolsAndTechnologies: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    jobMatchScore: {
      type: Type.OBJECT,
      nullable: true,
      properties: {
        score: { type: Type.INTEGER },
        breakdown: { type: Type.STRING },
      },
    },
    readabilityScore: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        feedback: { type: Type.STRING },
      },
    },
    grammarAndSpelling: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          error: { type: Type.STRING },
          suggestion: { type: Type.STRING },
        },
      },
    },
    aiSuggestions: {
      type: Type.OBJECT,
      properties: {
        rewrites: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              originalText: { type: Type.STRING },
              rewrittenText: { type: Type.STRING },
            },
          },
        },
      },
    },
    gapAnalysis: {
      type: Type.OBJECT,
      properties: {
        skillGaps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              gap: { type: Type.STRING },
              recommendation: { type: Type.STRING },
            },
          },
        },
        toolGaps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              gap: { type: Type.STRING },
              recommendation: { type: Type.STRING },
            },
          },
        },
      },
    },
    portfolioBuilderPrompt: {
      type: Type.OBJECT,
      properties: { prompt: { type: Type.STRING } },
    },
    careerGrowthPath: {
      type: Type.OBJECT,
      properties: { nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } } },
    },
    learningPathRecommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          resource: { type: Type.STRING },
          link: { type: Type.STRING },
        },
      },
    },
    careerTrajectoryPredictor: {
      type: Type.OBJECT,
      properties: {
        path: { type: Type.ARRAY, items: { type: Type.STRING } },
        commentary: { type: Type.STRING },
      },
    },
    resumeImpactPredictor: {
      type: Type.OBJECT,
      properties: {
        heatmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              line: { type: Type.STRING },
              impactScore: { type: Type.INTEGER },
              reasoning: { type: Type.STRING },
            },
          },
        },
      },
    },
  },
};

// ✅ Main function: analyze resume content
export async function analyzeResumeWithGemini(resumeInput, jobDescription = null) {
  const jobDescText = jobDescription
    ? `Here is the target job description:\n\n${jobDescription}`
    : "No job description provided. Analyze the resume in a general context.";

  const instructions = `
You are ResuAI, an expert resume analysis engine.
Return ONLY valid JSON (no extra text or markdown).
- atsCompatibility: 0–100
- jobMatchScore: null if no JD
- resumeImpactPredictor: line-by-line impact 1–5
`;

  const contents =
    typeof resumeInput === "string"
      ? [
          {
            text: `Analyze this resume thoroughly:\n\n--- RESUME START ---\n${resumeInput}\n--- RESUME END ---\n\n${jobDescText}\n${instructions}`,
          },
        ]
      : [
          { inlineData: { mimeType: resumeInput.mimeType, data: resumeInput.data } },
          { text: `${jobDescText}\n${instructions}` },
        ];

  const modelParams = {
    model: "gemini-2.5-flash",
    contents,
    config: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.2,
    },
  };

  try {
    const response = await ai.models.generateContent(modelParams);
    const jsonText = response.text?.trim();
    if (!jsonText) throw new Error("Empty Gemini response");
    const result = JSON.parse(jsonText);
    if (!jobDescription && result.jobMatchScore) result.jobMatchScore = null;
    return result;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("❌ Resume analysis failed. Check server logs.");
  }
}
