
import React from 'react';
import { Wand2, Briefcase, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
    onAnalyzeClick: () => void;
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary-500 text-white flex items-center justify-center">
            {icon}
        </div>
        <div className="ml-4">
            <dt className="text-lg leading-6 font-bold text-slate-900 dark:text-white">{title}</dt>
            <dd className="mt-1 text-base text-slate-500 dark:text-slate-400">{description}</dd>
        </div>
    </div>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAnalyzeClick }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-6">
                <Wand2 className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Welcome to ResuAI</h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Get instant, AI-powered feedback on your resume. Paste your resume text on the left to get started.
            </p>

            <div className="mt-10 text-left w-full max-w-3xl">
                <dl className="space-y-10">
                    <Feature 
                        icon={<Briefcase className="h-6 w-6" />}
                        title="ATS & Job Match Scoring"
                        description="See how your resume stacks up against Applicant Tracking Systems and specific job descriptions."
                    />
                    <Feature 
                        icon={<Sparkles className="h-6 w-6" />}
                        title="AI-Powered Rewrites"
                        description="Receive intelligent suggestions to improve your resume's clarity, impact, and overall effectiveness."
                    />
                     <Feature 
                        icon={<Wand2 className="h-6 w-6" />}
                        title="Career Path Prediction"
                        description="Discover potential career trajectories and get learning recommendations to fill skill gaps."
                    />
                </dl>
            </div>

            <div className="mt-12">
                <button
                    onClick={onAnalyzeClick}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Get Started Now
                </button>
            </div>
        </div>
    );
};
