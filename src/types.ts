
export interface AnalysisResult {
    atsCompatibility: {
        isCompatible: boolean;
        score: number;
        feedback: string;
    };
    roleDetection: {
        currentRole: string;
        targetRoles: string[];
    };
    recommendedRoles: {
        role: string;
        type: 'match' | 'stretch';
        reasoning: string;
    }[];
    skillAnalysis: {
        hardSkills: string[];
        softSkills: string[];
        toolsAndTechnologies: string[];
    };
    jobMatchScore: {
        score: number;
        breakdown: string;
    } | null;
    readabilityScore: {
        score: number;
        feedback: string;
    };
    grammarAndSpelling: {
        error: string;
        suggestion: string;
    }[];
    aiSuggestions: {
        rewrites: {
            originalText: string;
            rewrittenText: string;
        }[];
    };
    gapAnalysis: {
        skillGaps: {
            gap: string;
            recommendation: string;
        }[];
        toolGaps: {
            gap: string;
            recommendation: string;
        }[];
    };
    portfolioBuilderPrompt: {
        prompt: string;
    };
    careerGrowthPath: {
        nextSteps: string[];
    };
    learningPathRecommendations: {
        skill: string;
        resource: string;
        link: string;
    }[];
    careerTrajectoryPredictor: {
        path: string[];
        commentary: string;
    };
    resumeImpactPredictor: {
        heatmap: {
            line: string;
            impactScore: number; // Score from 1 (low) to 5 (high)
            reasoning: string;
        }[];
    };
}
