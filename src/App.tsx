import React, { useState, useRef, useCallback } from 'react';
import { analyzeResume } from './services/api';
import type { AnalysisResult } from './types';
import { AnalysisCard } from './components/AnalysisCard';
import { DonutChart } from './components/DonutChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { ResumeTemplates } from './components/ResumeTemplates';
import { FileText, Briefcase, Wand2, Sparkles, CheckCircle, XCircle, ChevronUp, ChevronDown, Bot, Trash2 } from 'lucide-react';

const App: React.FC = () => {
    const [resumeText, setResumeText] = useState<string>('');
    const [jobDescriptionText, setJobDescriptionText] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<{ name: string; data: string; mimeType: string; } | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeSections, setActiveSections] = useState<Record<string, boolean>>({
        scores: true,
        ats: true,
        roles: true,
        skills: true,
        feedback: true,
        gaps: true,
        growth: true,
        impact: true
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
             const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
            if (!allowedTypes.includes(file.type)) {
                setError("Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const base64Data = result.split(',')[1];
                setUploadedFile({
                    name: file.name,
                    data: base64Data,
                    mimeType: file.type,
                });
                setResumeText(''); // Clear textarea
                setError(null);
                 if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            };
            reader.onerror = () => {
                setError('Failed to read the file.');
                setUploadedFile(null);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!resumeText.trim() && !uploadedFile) {
            setError("Please provide your resume before analyzing.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const resumeInput = uploadedFile ? { data: uploadedFile.data, mimeType: uploadedFile.mimeType } : resumeText;
            const result = await analyzeResume(resumeInput, jobDescriptionText);
            setAnalysisResult(result);
        } catch (err) {
            console.error(err);
            setError("An error occurred during analysis. The AI model may be overloaded. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [resumeText, jobDescriptionText, uploadedFile]);
    
    const toggleSection = (section: string) => {
        setActiveSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const renderHeatmapText = (line: string, score: number) => {
        const intensity = (score -1) / 4; // normalize score from 1-5 to 0-1
        const bgColor = `rgba(2, 132, 199, ${intensity * 0.5})`; // Using primary-600 with varying alpha
        return <span style={{ backgroundColor: bgColor, padding: '2px 0' }} className="rounded-sm transition-colors duration-300">{line}</span>;
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-screen-2xl mx-auto">
                    {/* Input Column */}
                    <div className="lg:col-span-4 xl:col-span-3">
                         <div className="sticky top-8 space-y-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center"><FileText className="mr-2 text-primary-500"/> Your Resume</h2>
                                <textarea
                                    value={resumeText}
                                    onChange={(e) => {
                                        setResumeText(e.target.value);
                                        if (uploadedFile) {
                                            setUploadedFile(null);
                                        }
                                    }}
                                    placeholder="Paste your resume here..."
                                    className="w-full h-48 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-slate-200 dark:disabled:bg-slate-600"
                                    disabled={!!uploadedFile}
                                />
                                {uploadedFile && (
                                    <div className="mt-2 flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm">
                                        <p className="truncate text-slate-700 dark:text-slate-200" title={uploadedFile.name}>{uploadedFile.name}</p>
                                        <button 
                                            onClick={() => setUploadedFile(null)} 
                                            className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                                            aria-label="Remove file"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                                >
                                    Or upload PDF, DOCX, TXT file
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".txt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center"><Briefcase className="mr-2 text-primary-500"/> Target Job (Optional)</h2>
                                <textarea
                                    value={jobDescriptionText}
                                    onChange={(e) => setJobDescriptionText(e.target.value)}
                                    placeholder="Paste a job description here for a tailored analysis..."
                                    className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                />
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading || (!resumeText.trim() && !uploadedFile)}
                                className="w-full flex items-center justify-center bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg disabled:shadow-none"
                            >
                                {isLoading ? <><LoadingSpinner /> Analyzing...</> : <><Wand2 className="mr-2"/>Analyze Resume</>}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                                <LoadingSpinner size={12} />
                                <p className="text-xl font-semibold mt-4 text-primary-500">Analyzing your resume with AI...</p>
                                <p className="text-slate-500 dark:text-slate-400 mt-2">This may take a moment. We're checking skills, predicting career paths, and more!</p>
                            </div>
                        ) : analysisResult ? (
                            <div className="space-y-6">
                                {/* Scores */}
                                <AnalysisCard title="Overall Scores" icon={Sparkles} sectionKey="scores" isOpen={activeSections.scores} onToggle={toggleSection}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {analysisResult.jobMatchScore && <DonutChart score={analysisResult.jobMatchScore.score} title="Job Match" />}
                                        <DonutChart score={analysisResult.readabilityScore.score} title="Readability & Clarity" />
                                        <DonutChart score={analysisResult.atsCompatibility.score} title="ATS Compatibility" />
                                    </div>
                                    {analysisResult.jobMatchScore?.breakdown && <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">{analysisResult.jobMatchScore.breakdown}</p>}
                                </AnalysisCard>

                                <AnalysisCard title="ATS & Role Analysis" icon={Briefcase} sectionKey="ats" isOpen={activeSections.ats} onToggle={toggleSection}>
                                    <div className="space-y-4">
                                        <div className={`p-4 rounded-lg flex items-start ${analysisResult.atsCompatibility.isCompatible ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                                            {analysisResult.atsCompatibility.isCompatible ? <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" /> : <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />}
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100">ATS Compatibility</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">{analysisResult.atsCompatibility.feedback}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-100">Detected Role</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Current Role: <span className="font-semibold text-primary-600 dark:text-primary-400">{analysisResult.roleDetection.currentRole}</span></p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Potential Target Roles: <span className="font-semibold">{analysisResult.roleDetection.targetRoles.join(', ')}</span></p>
                                        </div>
                                    </div>
                                </AnalysisCard>

                                <AnalysisCard title="Skill & Technology Analysis" icon={Wand2} sectionKey="skills" isOpen={activeSections.skills} onToggle={toggleSection}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {(['hardSkills', 'softSkills', 'toolsAndTechnologies'] as const).map(skillType => (
                                             <div key={skillType} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                                                <h4 className="font-bold capitalize mb-2">{skillType.replace(/([A-Z])/g, ' $1').replace('And', ' & ')}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysisResult.skillAnalysis[skillType].map(skill => (
                                                        <span key={skill} className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                                                    ))}
                                                </div>
                                             </div>
                                        ))}
                                    </div>
                                </AnalysisCard>
                                
                                <AnalysisCard title="AI Feedback & Rewrites" icon={Bot} sectionKey="feedback" isOpen={activeSections.feedback} onToggle={toggleSection}>
                                    <div className="space-y-4">
                                        {analysisResult.aiSuggestions.rewrites.map((item, index) => (
                                            <div key={index} className="p-4 border-l-4 border-primary-500 bg-slate-100 dark:bg-slate-700/50 rounded-r-lg">
                                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">"{item.originalText}"</p>
                                                <p className="text-sm mt-2"><span className="font-bold text-green-600 dark:text-green-400">Suggestion:</span> {item.rewrittenText}</p>
                                            </div>
                                        ))}
                                        {analysisResult.grammarAndSpelling.map((item, index) => (
                                            <div key={index} className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/50 rounded-r-lg">
                                                <p className="text-sm text-slate-500 dark:text-slate-400">"{item.error}"</p>
                                                <p className="text-sm mt-2"><span className="font-bold text-amber-700 dark:text-amber-400">Correction:</span> {item.suggestion}</p>
                                            </div>
                                        ))}
                                    </div>
                                </AnalysisCard>
                                
                                <AnalysisCard title="Gap Analysis & Learning" icon={Sparkles} sectionKey="gaps" isOpen={activeSections.gaps} onToggle={toggleSection}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-bold mb-2">Skill Gaps</h4>
                                            <ul className="list-disc list-inside space-y-2">
                                                {analysisResult.gapAnalysis.skillGaps.map((gap, i) => <li key={i} className="text-sm"><span className="font-semibold">{gap.gap}:</span> {gap.recommendation}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Learning Path</h4>
                                             <ul className="space-y-2">
                                                {analysisResult.learningPathRecommendations.map((rec, i) => (
                                                    <li key={i} className="text-sm p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md"><span className="font-semibold">{rec.skill}:</span> <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{rec.resource}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </AnalysisCard>

                                <AnalysisCard title="Career Growth Path" icon={Briefcase} sectionKey="growth" isOpen={activeSections.growth} onToggle={toggleSection}>
                                   <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                      <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Predicted Trajectory</h4>
                                      <div className="flex items-center space-x-2 text-sm">
                                        {analysisResult.careerTrajectoryPredictor.path.map((step, index) => (
                                          <React.Fragment key={index}>
                                            <span className={`px-3 py-1 rounded-full ${index === 0 ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-600'}`}>{step}</span>
                                            {index < analysisResult.careerTrajectoryPredictor.path.length - 1 && <span className="text-slate-400">&rarr;</span>}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{analysisResult.careerTrajectoryPredictor.commentary}</p>
                                   </div>
                                </AnalysisCard>

                                <AnalysisCard title="Resume Impact Heatmap" icon={Wand2} sectionKey="impact" isOpen={activeSections.impact} onToggle={toggleSection}>
                                    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-1 text-sm font-mono leading-relaxed">
                                        {analysisResult.resumeImpactPredictor.heatmap.map((line, i) => (
                                            <div key={i}>{renderHeatmapText(line.line, line.impactScore)}</div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Lines with stronger color have a higher predicted impact on recruiters.</p>
                                </AnalysisCard>
                            </div>
                        ) : (
                             <div className="space-y-6">
                                <WelcomeScreen onAnalyzeClick={() => document.querySelector('textarea')?.focus()} />
                                <ResumeTemplates />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;