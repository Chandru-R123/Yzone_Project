import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'md';
    onClick?: () => void;
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
    return (
        <div
            className={clsx(
                variant === 'md' ? 'card-md' : 'card',
                onClick && 'cursor-pointer hover:shadow-card-md transition-shadow duration-200',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    trend?: { value: number; label: string };
    accent?: string;
    className?: string;
}

export function StatCard({ title, value, description, icon, trend, accent = 'text-primary-600', className }: StatCardProps) {
    return (
        <div className={clsx('card', className)}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="stat-label">{title}</p>
                    <p className={clsx('stat-value mt-1', accent)}>{value}</p>
                    {description && <p className="text-xs text-muted mt-1">{description}</p>}
                    {trend && (
                        <div className={clsx('flex items-center gap-1 mt-2 text-xs font-medium', trend.value >= 0 ? 'text-green-600' : 'text-red-500')}>
                            <span>{trend.value >= 0 ? '↑' : '↓'}</span>
                            <span>{Math.abs(trend.value)}% {trend.label}</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="ml-4 p-2.5 bg-primary-50 rounded-lg text-primary-600">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
