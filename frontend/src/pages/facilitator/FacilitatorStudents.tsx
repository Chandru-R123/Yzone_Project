import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { MOCK_STUDENTS } from '../../data/mockData';
import { useCohort } from '../../context/CohortContext';
import { AlertTriangle, Flame } from 'lucide-react';

export default function FacilitatorStudents() {
    const { selectedCohort } = useCohort();
    const students = MOCK_STUDENTS.filter(s => s.cohortId === selectedCohort?.id);

    return (
        <DashboardLayout title="Students" subtitle="All students in this cohort">
            <div className="space-y-3 max-w-4xl">
                {students.map(s => (
                    <Card key={s.id} className="animate-fadeIn">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold flex-shrink-0">
                                {s.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-gray-800">{s.name}</span>
                                    <span className="text-xs text-muted">{s.team} · {s.department}</span>
                                    {s.needsAttention && (
                                        <Badge variant="red"><AlertTriangle size={10} /> Needs Attention</Badge>
                                    )}
                                    <span className="ml-auto text-sm font-bold text-amber-600">#{s.rank}</span>
                                </div>
                                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div>
                                        <p className="text-xs text-muted mb-1">Attendance</p>
                                        <ProgressBar
                                            value={s.attendancePercent}
                                            color={s.attendancePercent >= 90 ? 'bg-green-500' : s.attendancePercent >= 75 ? 'bg-amber-400' : 'bg-red-400'}
                                            showPercent
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flame size={14} className="text-amber-500" />
                                        <div>
                                            <p className="text-xs text-muted">Streak</p>
                                            <p className="text-sm font-semibold text-gray-800">{s.trackerStreak} days</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted">Badges</p>
                                        <div className="flex gap-1 mt-0.5 flex-wrap">
                                            {s.badges.slice(0, 3).map(b => (
                                                <span key={b.id} className="text-sm" title={b.name}>{b.icon}</span>
                                            ))}
                                            {s.badges.length > 3 && <span className="text-xs text-muted">+{s.badges.length - 3}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
