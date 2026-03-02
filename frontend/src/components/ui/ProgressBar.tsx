import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
    value: number;         // 0 – 100
    max?: number;
    color?: string;
    label?: string;
    showPercent?: boolean;
    className?: string;
}

export function ProgressBar({ value, max = 100, color = 'bg-primary-500', label, showPercent = true, className }: ProgressBarProps) {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={clsx('w-full', className)}>
            {(label || showPercent) && (
                <div className="flex justify-between text-xs text-muted mb-1">
                    {label && <span>{label}</span>}
                    {showPercent && <span className="font-medium text-gray-700">{Math.round(pct)}%</span>}
                </div>
            )}
            <div className="progress-bar">
                <div
                    className={clsx('progress-fill', color)}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}
