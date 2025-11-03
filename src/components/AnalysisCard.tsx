
import React from 'react';
import type { LucideProps } from 'lucide-react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface AnalysisCardProps {
    title: string;
    icon: React.ComponentType<LucideProps>;
    children: React.ReactNode;
    sectionKey: string;
    isOpen: boolean;
    onToggle: (sectionKey: string) => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon: Icon, children, sectionKey, isOpen, onToggle }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <button
                onClick={() => onToggle(sectionKey)}
                className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <Icon className="w-6 h-6 mr-3 text-primary-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
            </button>
            {isOpen && (
                <div className="px-4 sm:px-6 pb-6 pt-0">
                    {children}
                </div>
            )}
        </div>
    );
};
