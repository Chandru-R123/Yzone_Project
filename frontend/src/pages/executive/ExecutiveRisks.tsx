import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { MOCK_RISK_FLAGS, MOCK_COHORTS } from '../../data/mockData';
import { AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export default function ExecutiveRisks() {
    return (
        <DashboardLayout title="Risk Flags" subtitle="Students and cohorts flagged for intervention">
            <div className="max-w-3xl space-y-3">
                {MOCK_RISK_FLAGS.length === 0 && (
                    <div className="text-center py-16 text-muted">
                        <AlertTriangle size={32} className="mx-auto mb-3 stroke-1 text-gray-300" />
                        No risk flags at this time.
                    </div>
                )}
                {MOCK_RISK_FLAGS.map((flag, i) => (
                    <Card key={i} className={clsx(
                        'animate-fadeIn border-l-4',
                        flag.severity === 'high' ? 'border-l-red-500' :
                            flag.severity === 'medium' ? 'border-l-amber-500' :
                                'border-l-blue-500'
                    )}>
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={18} className={clsx(
                                'flex-shrink-0 mt-0.5',
                                flag.severity === 'high' ? 'text-red-500' :
                                    flag.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                            )} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-gray-800">{flag.studentName}</span>
                                    <span className="text-xs text-muted">·</span>
                                    <span className="text-xs text-muted">{flag.cohortName}</span>
                                    <StatusBadge status={flag.severity} className="ml-auto" />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{flag.reason}</p>
                                <p className="text-xs text-muted mt-1">Flagged: {new Date(flag.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
