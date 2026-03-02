import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { MOCK_STUDENTS, MOCK_COHORTS } from '../../data/mockData';
import { Flame } from 'lucide-react';

export default function ExecutiveStudents() {
    return (
        <DashboardLayout title="All Students" subtitle="Cross-cohort student view">
            <div className="max-w-5xl">
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Cohort</th>
                                <th>Team</th>
                                <th>Attendance</th>
                                <th>Streak</th>
                                <th>Rank</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_STUDENTS.map(s => {
                                const cohort = MOCK_COHORTS.find(c => c.id === s.cohortId);
                                return (
                                    <tr key={s.id}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold flex-shrink-0">
                                                    {s.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 text-sm">{s.name}</p>
                                                    <p className="text-xs text-muted">{s.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="text-sm text-gray-600">{cohort?.name.split(' ').slice(0, 2).join(' ')}</span></td>
                                        <td><span className="badge-blue">{s.team}</span></td>
                                        <td>
                                            <span className={`text-sm font-semibold ${s.attendancePercent >= 90 ? 'text-green-600' : s.attendancePercent >= 75 ? 'text-amber-600' : 'text-red-500'}`}>
                                                {s.attendancePercent}%
                                            </span>
                                        </td>
                                        <td>
                                            <span className="flex items-center gap-1 text-sm"><Flame size={12} className="text-amber-500" />{s.trackerStreak}d</span>
                                        </td>
                                        <td><span className="text-sm font-bold text-gray-700">#{s.rank}</span></td>
                                        <td>
                                            {s.needsAttention ? <StatusBadge status="high" /> : <StatusBadge status="active" />}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
