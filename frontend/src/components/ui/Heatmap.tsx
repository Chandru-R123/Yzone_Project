import React from 'react';
import { clsx } from 'clsx';
import { Tooltip } from './Tooltip';

interface HeatmapProps {
    data: { date: string; value: number; label?: string }[];
    maxValue?: number;
    weeks?: number;
    title?: string;
}

const INTENSITY_COLORS = [
    'bg-gray-100',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-400',
    'bg-primary-600',
];

function getIntensity(value: number, max: number): number {
    if (value === 0) return 0;
    const ratio = value / max;
    if (ratio < 0.25) return 1;
    if (ratio < 0.5) return 2;
    if (ratio < 0.75) return 3;
    return 4;
}

export function Heatmap({ data, maxValue = 1, title }: HeatmapProps) {
    return (
        <div>
            {title && <p className="text-sm font-medium text-gray-700 mb-3">{title}</p>}
            <div className="flex flex-wrap gap-1">
                {data.map((d, idx) => {
                    const intensity = getIntensity(d.value, maxValue);
                    return (
                        <div
                            key={idx}
                            className={clsx('heatmap-cell', INTENSITY_COLORS[intensity])}
                            title={d.label ?? `${d.date}: ${d.value}`}
                        />
                    );
                })}
            </div>
            <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-muted mr-1">Less</span>
                {INTENSITY_COLORS.map((c, i) => (
                    <div key={i} className={clsx('w-3.5 h-3.5 rounded-sm', c)} />
                ))}
                <span className="text-xs text-muted ml-1">More</span>
            </div>
        </div>
    );
}
