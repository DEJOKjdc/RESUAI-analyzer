
import React from 'react';
import { Wand2 } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800 shadow-md">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary-600 p-2 rounded-lg">
                            <Wand2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">ResuAI</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Your Personal AI Resume Coach</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
