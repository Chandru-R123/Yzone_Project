import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
    variant?: 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gray';
    children: React.ReactNode;
    className?: string;
}

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
    return (
        <span className={clsx(`badge-${variant}`, className)}>
            {children}
        </span>
    );
}

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
        accepted: { label: 'Accepted', variant: 'green' },
        active: { label: 'Active', variant: 'green' },
        present: { label: 'Present', variant: 'green' },
        submitted: { label: 'Submitted', variant: 'green' },
        reviewed: { label: 'Reviewed', variant: 'blue' },
        pending: { label: 'Pending', variant: 'yellow' },
        in_progress: { label: 'In Progress', variant: 'yellow' },
        upcoming: { label: 'Upcoming', variant: 'blue' },
        reason: { label: 'Excused', variant: 'purple' },
        absent: { label: 'Absent', variant: 'red' },
        not_started: { label: 'Not Started', variant: 'gray' },
        completed: { label: 'Completed', variant: 'green' },
        high: { label: 'High Risk', variant: 'red' },
        medium: { label: 'Medium Risk', variant: 'yellow' },
        low: { label: 'Low Risk', variant: 'blue' },
    };

    const cfg = map[status] ?? { label: status, variant: 'gray' as const };
    return <Badge variant={cfg.variant} className={className}>{cfg.label}</Badge>;
}
