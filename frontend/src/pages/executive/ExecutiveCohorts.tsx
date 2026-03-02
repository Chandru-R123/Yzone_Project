import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatusBadge } from '../../components/ui/Badge';
import { MOCK_COHORTS } from '../../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b'];

export default function ExecutiveCohorts() {
    const data = MOCK_COHORTS.map(c => ({
        name: c.name.split(' ').slice(0, 2).join(' '),
        students: c.studentCount,
        completion: c.completionRate,
        engagement: c.engagementScore,
    }));

    return (
        <DashboardLayout title="Cohort Analysis" subtitle="Performance and completion across all cohorts">
            <div className="space-y-5 max-w-5xl">
                <Card className="animate-fadeIn">
                    <h3 className="section-title mb-4">Student Count by Cohort</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
                                <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                                    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MOCK_COHORTS.map(c => (
                        <Card key={c.id} className="animate-fadeIn">
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">{c.name}</h4>
                                    <p className="text-xs text-muted">{c.department}</p>
                                </div>
                                <StatusBadge status={c.status} />
                            </div>
                            <div className="space-y-2">
                                <ProgressBar value={c.completionRate} label="Completion" color="bg-primary-500" />
                                <ProgressBar
                                    value={c.engagementScore}
                                    label="Engagement"
                                    color={c.engagementScore >= 80 ? 'bg-green-500' : 'bg-amber-400'}
                                />
                            </div>
                            <p className="text-xs text-muted mt-3">{c.studentCount} students · {c.batch}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
