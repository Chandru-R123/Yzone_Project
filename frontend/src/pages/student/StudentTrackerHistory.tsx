import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { MOCK_TRACKER_ENTRIES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Clock, AlertCircle, Calendar, List } from 'lucide-react';
import { clsx } from 'clsx';

type ViewMode = 'list' | 'calendar';

function TrackerCard({ entry }: { entry: typeof MOCK_TRACKER_ENTRIES[0] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-lg hover:border-primary-200 hover:shadow-card transition-all duration-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-3 p-3 text-left"
            >
                <div className={clsx(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    entry.isLate ? 'bg-amber-100' : 'bg-green-100'
                )}>
                    {entry.isLate ? <Clock size={16} className="text-amber-600" /> : <CheckCircle2 size={16} className="text-green-600" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">
                            {new Date(entry.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </p>
                        {entry.isLate && <Badge variant="yellow">Late</Badge>}
                    </div>
                    <p className="text-xs text-muted truncate">{entry.submittedAt ? `Submitted at ${new Date(entry.submittedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}` : 'Not submitted'}</p>
                </div>
                {entry.remark && <AlertCircle size={14} className="text-primary-400 flex-shrink-0" />}
            </button>

            {open && (
                <div className="px-3 pb-3 border-t border-gray-50 pt-3 space-y-2 animate-fadeIn">
                    <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-600 mb-0.5">Learnings</p>
                        <p className="text-sm text-gray-700">{entry.learnings || '—'}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-amber-600 mb-0.5">Challenges</p>
                        <p className="text-sm text-gray-700">{entry.challenges || '—'}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-green-600 mb-0.5">Plans</p>
                        <p className="text-sm text-gray-700">{entry.plans || '—'}</p>
                    </div>
                    {entry.remark && (
                        <div className="bg-primary-50 rounded-lg p-3 flex items-start gap-2">
                            <AlertCircle size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-medium text-primary-600 mb-0.5">Facilitator Remark</p>
                                <p className="text-sm text-gray-700">{entry.remark}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function StudentTrackerHistory() {
    const { currentUser } = useAuth();
    const [view, setView] = useState<ViewMode>('list');
    const entries = MOCK_TRACKER_ENTRIES
        .filter(t => t.studentId === currentUser?.id && t.submittedAt)
        .sort((a, b) => b.date.localeCompare(a.date));

    const submitted = entries.length;
    const late = entries.filter(e => e.isLate).length;
    const streak = 14;

    return (
        <DashboardLayout title="Tracker History" subtitle="All past reflections">
            <div className="max-w-3xl mx-auto space-y-4">
                {/* Summary */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Submitted', value: submitted, color: 'text-green-600' },
                        { label: 'Late', value: late, color: 'text-amber-600' },
                        { label: 'Streak', value: `${streak}d`, color: 'text-primary-600' },
                    ].map(s => (
                        <div key={s.label} className="card text-center py-4">
                            <p className={clsx('text-2xl font-bold', s.color)}>{s.value}</p>
                            <p className="text-xs text-muted mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* View toggle */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="section-title">Entry History</h3>
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => setView('list')} className={clsx('px-3 py-1.5 text-xs font-medium flex items-center gap-1 transition-colors', view === 'list' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50')}>
                                <List size={13} /> List
                            </button>
                            <button onClick={() => setView('calendar')} className={clsx('px-3 py-1.5 text-xs font-medium flex items-center gap-1 transition-colors', view === 'calendar' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50')}>
                                <Calendar size={13} /> Calendar
                            </button>
                        </div>
                    </div>

                    {view === 'list' ? (
                        <div className="space-y-2">
                            {entries.map(e => <TrackerCard key={e.id} entry={e} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-7 gap-1 mt-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-center text-xs text-muted font-medium py-1">{d}</div>
                            ))}
                            {/* Simple calendar dots */}
                            {Array.from({ length: 28 }, (_, i) => {
                                const day = new Date(2025, 1, i + 1);
                                const dateStr = day.toISOString().split('T')[0];
                                const entry = entries.find(e => e.date === dateStr);
                                return (
                                    <div key={i} className="flex items-center justify-center py-2">
                                        <div className={clsx(
                                            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium',
                                            entry ? (entry.isLate ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700') : 'text-gray-400'
                                        )}>
                                            {i + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
