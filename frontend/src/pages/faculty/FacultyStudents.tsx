import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { MOCK_STUDENTS, MOCK_REVIEW_WINDOWS, MOCK_TRACKER_ENTRIES } from '../../data/mockData';

export default function FacultyStudents() {
    const students = MOCK_STUDENTS.slice(0, 4);
    return (
        <DashboardLayout title="My Students" subtitle="All students assigned to you">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {students.map(s => (
                    <div key={s.id} className="card animate-fadeIn">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                {s.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{s.name}</p>
                                <p className="text-xs text-muted">{s.team} · Attendance {s.attendancePercent}%</p>
                            </div>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {s.badges.map(b => <span key={b.id} title={b.name}>{b.icon}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
