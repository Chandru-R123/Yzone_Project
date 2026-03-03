import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, Card } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { Heatmap } from '../../components/ui/Heatmap';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useCohort } from '../../context/CohortContext';
import { MOCK_STUDENTS, MOCK_TRACKER_ENTRIES, MOCK_SESSIONS } from '../../data/mockData';
import {
    Users, CheckCircle2, AlertTriangle, Calendar, TrendingUp, ClipboardList, Star, Zap
} from 'lucide-react';

function generateHeatmapData() {
    const data = [];
    for (let i = 27; i >= 0; i--) {
        const d = new Date(2025, 1, i + 1);
        const dateStr = d.toISOString().split('T')[0];
        const count = MOCK_TRACKER_ENTRIES.filter(t => t.date === dateStr && t.submittedAt).length;
        data.push({ date: dateStr, value: count, label: `${dateStr}: ${count} submissions` });
    }
    return data.reverse();
}

export default function FacilitatorDashboard() {
    const { selectedCohort } = useCohort();
    const students = MOCK_STUDENTS.filter(s => s.cohortId === selectedCohort?.id);
    const flagged = students.filter(s => s.needsAttention);
    const heatmapData = generateHeatmapData();
    const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendancePercent, 0) / (students.length || 1));

    return (
        <DashboardLayout title="Cohort Dashboard" subtitle="Facilitator overview">
            <div className="space-y-5 max-w-6xl">
                {/* Stat widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard
                        title="Total Students" value={students.length}
                        icon={<Users size={18} />} trend={{ value: 0, label: 'enrolled' }}
                    />
                    <StatCard
                        title="Avg Attendance" value={`${avgAttendance}%`}
                        icon={<CheckCircle2 size={18} />} accent="text-green-600"
                    />
                    <StatCard
                        title="Needs Attention" value={flagged.length}
                        icon={<AlertTriangle size={18} />} accent="text-red-500"
                    />
                    <StatCard
                        title="Upcoming Reviews" value="2"
                        icon={<Star size={18} />} accent="text-violet-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Heatmap */}
                    <Card className="lg:col-span-2 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <ClipboardList size={18} className="text-primary-500" />
                            <h3 className="section-title">Tracker Submission Heatmap</h3>
                            <span className="ml-auto text-xs text-muted">Last 28 days</span>
                        </div>
                        <Heatmap data={heatmapData} maxValue={students.length || 1} />
                    </Card>

                    {/* Upcoming sessions */}
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar size={18} className="text-primary-500" />
                            <h3 className="section-title">Upcoming Sessions</h3>
                        </div>
                        <div className="space-y-2">
                            {MOCK_SESSIONS.slice(0, 4).map(s => (
                                <div key={s.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar size={14} className="text-primary-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{s.title}</p>
                                        <p className="text-xs text-muted">{new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {s.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Flagged students */}
                {flagged.length > 0 && (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={18} className="text-red-500" />
                            <h3 className="section-title text-red-600">Students Needing Attention</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {flagged.map(s => (
                                <div key={s.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-sm">
                                        {s.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                                        <p className="text-xs text-muted">Attendance: {s.attendancePercent}% · Streak: {s.trackerStreak}d</p>
                                    </div>
                                    <StatusBadge status="high" />
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Attendance overview */}
                <Card className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={18} className="text-primary-500" />
                        <h3 className="section-title">Student Attendance Overview</h3>
                    </div>
                    <div className="space-y-3">
                        {students.map(s => (
                            <div key={s.id} className="flex items-center gap-3">
                                <div className="w-24 text-sm text-gray-700 font-medium truncate">{s.name.split(' ')[0]}</div>
                                <div className="flex-1">
                                    <ProgressBar
                                        value={s.attendancePercent}
                                        color={s.attendancePercent >= 90 ? 'bg-green-500' : s.attendancePercent >= 75 ? 'bg-amber-400' : 'bg-red-400'}
                                        showPercent={false}
                                    />
                                </div>
                                <span className={`text-xs font-semibold w-8 text-right ${s.attendancePercent >= 90 ? 'text-green-600' : s.attendancePercent >= 75 ? 'text-amber-600' : 'text-red-500'}`}>
                                    {s.attendancePercent}%
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
