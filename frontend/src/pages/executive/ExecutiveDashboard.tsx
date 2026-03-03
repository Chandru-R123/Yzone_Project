import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, Card } from '../../components/ui/Card';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { MOCK_COHORTS, MOCK_RISK_FLAGS, ENGAGEMENT_TREND, MOCK_STUDENTS } from '../../data/mockData';
import {
    BarChart3, Users, AlertTriangle, TrendingUp, Activity, Zap, ChevronRight, Globe
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { clsx } from 'clsx';

export default function ExecutiveDashboard() {
    const [drillCohort, setDrillCohort] = useState<typeof MOCK_COHORTS[0] | null>(null);
    const [overrideModal, setOverrideModal] = useState<typeof MOCK_STUDENTS[0] | null>(null);
    const [overrideReason, setOverrideReason] = useState('');
    const [overrideScore, setOverrideScore] = useState('');

    const active = MOCK_COHORTS.filter(c => c.status === 'active').length;
    const totalStudents = MOCK_COHORTS.reduce((a, c) => a + c.studentCount, 0);
    const avgEngagement = Math.round(MOCK_COHORTS.reduce((a, c) => a + c.engagementScore, 0) / MOCK_COHORTS.length);

    return (
        <DashboardLayout title="Executive Hub" subtitle="Cross-cohort intelligence dashboard">
            <div className="space-y-5 max-w-7xl">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard title="Active Cohorts" value={active} icon={<Activity size={18} />} trend={{ value: 2, label: 'vs last term' }} />
                    <StatCard title="Total Students" value={totalStudents} icon={<Users size={18} />} />
                    <StatCard title="Avg Engagement" value={`${avgEngagement}%`} icon={<TrendingUp size={18} />} accent="text-green-600" trend={{ value: 4, label: 'this week' }} />
                    <StatCard title="Risk Flags" value={MOCK_RISK_FLAGS.length} icon={<AlertTriangle size={18} />} accent="text-red-500" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Engagement Trend Chart */}
                    <Card className="xl:col-span-2 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 size={18} className="text-primary-500" />
                            <h3 className="section-title">Cohort Engagement Trends</h3>
                        </div>
                        <div className="h-52">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ENGAGEMENT_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6b7280' }} />
                                    <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
                                    <Legend wrapperStyle={{ fontSize: 12 }} />
                                    <Line type="monotone" dataKey="c1" name="Full Stack" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                                    <Line type="monotone" dataKey="c2" name="Data Science" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Risk Flags */}
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={18} className="text-red-500" />
                            <h3 className="section-title">Risk Flags</h3>
                        </div>
                        <div className="space-y-2">
                            {MOCK_RISK_FLAGS.map((flag, i) => (
                                <div key={i} className={clsx(
                                    'p-3 rounded-lg border',
                                    flag.severity === 'high' ? 'bg-red-50 border-red-200' :
                                        flag.severity === 'medium' ? 'bg-amber-50 border-amber-200' :
                                            'bg-blue-50 border-blue-200'
                                )}>
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800">{flag.studentName}</p>
                                            <p className="text-xs text-muted">{flag.cohortName}</p>
                                            <p className="text-xs text-gray-600 mt-1">{flag.reason}</p>
                                        </div>
                                        <StatusBadge status={flag.severity} />
                                    </div>
                                </div>
                            ))}
                            {MOCK_RISK_FLAGS.length === 0 && (
                                <p className="text-sm text-muted text-center py-4">No active risk flags 🎉</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Cross-cohort table */}
                <Card className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe size={18} className="text-primary-500" />
                        <h3 className="section-title">All Cohorts</h3>
                    </div>
                    <div className="space-y-3">
                        {MOCK_COHORTS.map(c => (
                            <div
                                key={c.id}
                                onClick={() => setDrillCohort(c)}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group border border-transparent hover:border-gray-200"
                            >
                                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                                        <p className="text-xs text-muted">{c.department} · {c.studentCount} students</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted mb-1">Completion</p>
                                        <ProgressBar value={c.completionRate} color="bg-primary-500" showPercent={false} />
                                        <p className="text-xs font-medium text-gray-700 mt-0.5">{c.completionRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted mb-1">Engagement</p>
                                        <ProgressBar
                                            value={c.engagementScore}
                                            color={c.engagementScore >= 80 ? 'bg-green-500' : c.engagementScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}
                                            showPercent={false}
                                        />
                                        <p className="text-xs font-medium text-gray-700 mt-0.5">{c.engagementScore}%</p>
                                    </div>
                                    <div className="flex items-center gap-2 justify-between">
                                        <StatusBadge status={c.status} />
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Drill-down Modal */}
            <Modal
                isOpen={!!drillCohort}
                onClose={() => setDrillCohort(null)}
                title={`Drill-down: ${drillCohort?.name ?? ''}`}
                size="xl"
            >
                {drillCohort && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Department', value: drillCohort.department },
                                { label: 'Batch', value: drillCohort.batch },
                                { label: 'Students', value: drillCohort.studentCount },
                                { label: 'Completion', value: `${drillCohort.completionRate}%` },
                            ].map(item => (
                                <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-muted">{item.label}</p>
                                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Students in Cohort</p>
                            <div className="space-y-2">
                                {MOCK_STUDENTS.filter(s => s.cohortId === drillCohort.id).map(s => (
                                    <div key={s.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                                        <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                                            {s.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{s.name}</p>
                                            <p className="text-xs text-muted">Rank #{s.rank} · {s.attendancePercent}% attendance</p>
                                        </div>
                                        <button
                                            onClick={() => setOverrideModal(s)}
                                            className="btn-outline btn-sm text-xs"
                                        >
                                            Override Score
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Override Score Modal */}
            <Modal
                isOpen={!!overrideModal}
                onClose={() => setOverrideModal(null)}
                title={`Override Score — ${overrideModal?.name ?? ''}`}
                size="sm"
                footer={
                    <>
                        <button className="btn-secondary btn-sm" onClick={() => setOverrideModal(null)}>Cancel</button>
                        <button className="btn-primary btn-sm" disabled={!overrideReason.trim()} onClick={() => setOverrideModal(null)}>
                            Apply Override
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-700 flex items-start gap-2">
                        <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                        Score overrides are logged and visible in audit history.
                    </div>
                    <div>
                        <label className="input-label">New Score (0–100)</label>
                        <input type="number" min={0} max={100} className="input" value={overrideScore} onChange={e => setOverrideScore(e.target.value)} placeholder="e.g. 85" />
                    </div>
                    <div>
                        <label className="input-label">Reason for Override <span className="text-red-500">*</span></label>
                        <textarea rows={3} className="textarea" placeholder="Provide justification…" value={overrideReason} onChange={e => setOverrideReason(e.target.value)} />
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
