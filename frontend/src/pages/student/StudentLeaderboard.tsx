import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { MOCK_LEADERBOARD, MOCK_STUDENTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Trophy, Flame, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function StudentLeaderboard() {
    const { currentUser } = useAuth();
    const entries = MOCK_LEADERBOARD;

    return (
        <DashboardLayout title="Leaderboard" subtitle="Cohort rankings based on engagement score">
            <div className="max-w-2xl mx-auto space-y-4">
                <Card className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy size={20} className="text-amber-500" />
                        <h3 className="section-title">Full Stack Batch 2025</h3>
                    </div>

                    <div className="space-y-2">
                        {entries.map((entry) => {
                            const isMe = entry.studentId === currentUser?.id;
                            const student = MOCK_STUDENTS.find(s => s.id === entry.studentId);
                            return (
                                <div
                                    key={entry.studentId}
                                    className={clsx(
                                        'flex items-center gap-3 p-3 rounded-lg transition-all duration-150',
                                        isMe ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'
                                    )}
                                >
                                    <div className="w-8 text-center text-base">
                                        {MEDAL[entry.rank] ?? <span className="text-sm font-bold text-muted">#{entry.rank}</span>}
                                    </div>
                                    <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                                        isMe ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                                    )}>
                                        {entry.studentName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={clsx('text-sm font-semibold truncate', isMe ? 'text-primary-700' : 'text-gray-800')}>
                                            {entry.studentName} {isMe && <span className="text-xs font-normal">(you)</span>}
                                        </p>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="text-xs text-muted flex items-center gap-1"><Flame size={10} className="text-amber-500" /> {entry.trackerStreak}d</span>
                                            <span className="text-xs text-muted flex items-center gap-1"><CheckCircle2 size={10} className="text-green-500" /> {entry.attendance}%</span>
                                            <span className="text-xs text-muted">🏅 {entry.badges}</span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <div className="text-sm font-bold text-gray-800">{entry.score}</div>
                                        <div className="text-xs text-muted">pts</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
