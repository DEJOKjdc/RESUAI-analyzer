
import React from 'react';

interface DonutChartProps {
    score: number;
    title: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ score, title }) => {
    const sqSize = 120;
    const strokeWidth = 10;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * score) / 100;

    let colorClass = 'text-green-500';
    if (score < 75) colorClass = 'text-yellow-500';
    if (score < 50) colorClass = 'text-red-500';

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <div className="relative w-32 h-32">
                 <svg width={sqSize} height={sqSize} viewBox={viewBox} className="transform -rotate-90">
                    <circle
                        className="stroke-current text-slate-200 dark:text-slate-600"
                        cx={sqSize / 2}
                        cy={sqSize / 2}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`}
                        fill="none"
                    />
                    <circle
                        className={`stroke-current ${colorClass} transition-all duration-500 ease-in-out`}
                        cx={sqSize / 2}
                        cy={sqSize / 2}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`}
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: dashArray,
                            strokeDashoffset: dashOffset,
                        }}
                    />
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${colorClass}`}>
                    {score}
                </div>
            </div>
            <h4 className="mt-2 font-semibold text-center text-sm text-slate-700 dark:text-slate-300">{title}</h4>
        </div>
    );
};
