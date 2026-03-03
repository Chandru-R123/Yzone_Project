import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, Card } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { useCohort } from '../../context/CohortContext';
import { useAuth } from '../../context/AuthContext';
import {
    MOCK_TRACKER_ENTRIES, MOCK_PROJECTS, MOCK_FEEDBACK,
    MOCK_LEADERBOARD, MOCK_STUDENTS
} from '../../data/mockData';
import {
    CheckCircle2, Clock, BookOpen, Target, Award,
    TrendingUp, ChevronRight, Lock, Save, Flame, AlertCircle
} from 'lucide-react';

function TodayFocus() {
    const now = new Date();
    const hour = now.getHours();
    const isLocked = hour >= 24 || (hour === 23 && now.getMinutes() >= 59);

    return (
        <Card className="border-l-4 border-l-primary-500 animate-fadeIn">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="section-title">Today's Focus</h3>
                    <p className="section-subtitle">Friday, 27 Feb 2025</p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${isLocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {isLocked ? <Lock size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />}
                    {isLocked ? 'Locked' : 'Open'}
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-lg">
                    <Clock size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-blue-500 font-medium">Upcoming Session</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">Deployment Lab</p>
                        <p className="text-xs text-muted">Tomorrow, 10:00 AM</p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-lg">
                    <Target size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-amber-600 font-medium">Task Due</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">API Integration</p>
                        <p className="text-xs text-muted">Tomorrow, 23:59</p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-green-600 font-medium">Tracker</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">Submitted</p>
                        <p className="text-xs text-muted">Today at 6:32 PM</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function DailyTrackerPanel({ studentId }: { studentId: string }) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const hour = today.getHours();
    const isLocked = hour >= 23 && today.getMinutes() >= 59;

    const existing = MOCK_TRACKER_ENTRIES.find(t => t.studentId === studentId && t.date === todayStr);

    const [fields, setFields] = useState({
        learnings: existing?.learnings ?? '',
        challenges: existing?.challenges ?? '',
        plans: existing?.plans ?? '',
    });
    const [saved, setSaved] = useState(!!existing);
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        if (!fields.learnings || !fields.challenges || !fields.plans) return;
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); }, 800);
    };

    const allFilled = fields.learnings && fields.challenges && fields.plans;

    return (
        <Card className="animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="section-title">Daily Tracker</h3>
                    <p className="section-subtitle">Today's reflection — all 3 fields required</p>
                </div>
                {isLocked ? (
                    <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2.5 py-1 rounded-full"><Lock size={12} /> Locked after 23:59</span>
                ) : saved ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><CheckCircle2 size={12} /> Saved</span>
                ) : null}
            </div>

            <div className="space-y-3">
                {[
                    { key: 'learnings', label: "What did you learn today?", placeholder: "Describe your key learning…" },
                    { key: 'challenges', label: "What challenges did you face?", placeholder: "Describe any blockers…" },
                    { key: 'plans', label: "What will you do tomorrow?", placeholder: "Your plan for tomorrow…" },
                ].map(f => (
                    <div key={f.key}>
                        <label className="input-label">{f.label}</label>
                        <textarea
                            rows={2}
                            disabled={isLocked || saved}
                            className={`textarea ${isLocked || saved ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                            placeholder={f.placeholder}
                            value={fields[f.key as keyof typeof fields]}
                            onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                        />
                    </div>
                ))}
            </div>

            {!isLocked && !saved && (
                <div className="flex items-center gap-3 mt-4">
                    <button
                        onClick={handleSave}
                        disabled={!allFilled || saving}
                        className="btn-primary btn-sm"
                    >
                        <Save size={14} />
                        {saving ? 'Saving…' : 'Save Tracker'}
                    </button>
                    {!allFilled && (
                        <span className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle size={12} /> Fill all 3 fields</span>
                    )}
                </div>
            )}
        </Card>
    );
}

function FeedbackHighlights({ studentId }: { studentId: string }) {
    const feedbacks = MOCK_FEEDBACK.filter(f => f.toStudentId === studentId);
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? feedbacks : feedbacks.slice(0, 1);

    if (feedbacks.length === 0) return null;

    return (
        <Card className="animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
                <h3 className="section-title">Feedback Highlights</h3>
                {!feedbacks[0].isRead && <Badge variant="blue">New</Badge>}
            </div>
            <div className="space-y-3">
                {visible.map(fb => (
                    <div key={fb.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                                {fb.fromName.charAt(0)}
                            </div>
                            <span className="text-xs font-medium text-gray-700">{fb.fromName}</span>
                            <span className="text-xs text-muted">· {new Date(fb.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                            {fb.score && <span className="ml-auto text-xs font-semibold text-primary-600">{fb.score}/100</span>}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">"{fb.message}"</p>
                    </div>
                ))}
            </div>
            {feedbacks.length > 1 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                    {expanded ? 'Show less' : `View ${feedbacks.length - 1} more`}
                    <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>
            )}
        </Card>
    );
}

function ProjectsPanel({ studentId }: { studentId: string }) {
    const projects = MOCK_PROJECTS.filter(p => p.studentId === studentId);

    return (
        <Card className="animate-fadeIn">
            <h3 className="section-title mb-4">My Projects</h3>
            <div className="space-y-4">
                {projects.map(p => {
                    const done = p.milestones.filter(m => m.completed).length;
                    const pct = Math.round((done / p.milestones.length) * 100);
                    return (
                        <div key={p.id} className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-primary-600 uppercase">{p.type} Project</span>
                                        <StatusBadge status={p.status} />
                                    </div>
                                    <p className="font-semibold text-gray-800 text-sm mt-0.5">{p.title}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">{pct}%</span>
                            </div>
                            <ProgressBar
                                value={done}
                                max={p.milestones.length}
                                color={pct < 50 ? 'bg-amber-400' : pct < 100 ? 'bg-primary-500' : 'bg-green-500'}
                                showPercent={false}
                            />
                            <p className="text-xs text-muted mt-1">{done} of {p.milestones.length} milestones</p>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function BadgesLeaderboard({ studentId }: { studentId: string }) {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    const myEntry = MOCK_LEADERBOARD.find(l => l.studentId === studentId);
    if (!student) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-amber-500" />
                    <h3 className="section-title">Badges Earned</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {student.badges.map(b => (
                        <span key={b.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${b.color} border-current/20`}>
                            <span>{b.icon}</span> {b.name}
                        </span>
                    ))}
                </div>
            </Card>

            <Card className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={18} className="text-primary-500" />
                    <h3 className="section-title">Leaderboard</h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xl">#{myEntry?.rank ?? '–'}</span>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{myEntry?.score ?? 0} pts</p>
                        <p className="text-xs text-muted mt-0.5">🔥 {student.trackerStreak}-day streak · {student.attendancePercent}% attendance</p>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    {MOCK_LEADERBOARD.slice(0, 3).map(l => (
                        <div key={l.studentId} className={`flex items-center gap-2 text-sm py-1 ${l.studentId === studentId ? 'font-semibold text-primary-700' : 'text-gray-600'}`}>
                            <span className="w-5 text-center font-bold text-muted text-xs">#{l.rank}</span>
                            <span className="flex-1 truncate">{l.studentName}</span>
                            <span className="text-xs text-muted">{l.score}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default function StudentDashboard() {
    const { currentUser } = useAuth();
    if (!currentUser) return null;

    return (
        <DashboardLayout title="Student Dashboard" subtitle="Your personal learning space">
            <div className="space-y-4 max-w-4xl mx-auto">
                {/* Top stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard title="Tracker Streak" value="14 days" icon={<Flame size={18} />} trend={{ value: 2, label: 'vs last week' }} />
                    <StatCard title="Attendance" value="96%" icon={<CheckCircle2 size={18} />} accent="text-green-600" />
                    <StatCard title="Rank" value="#1" icon={<Award size={18} />} accent="text-amber-600" />
                    <StatCard title="Badges" value="4" icon={<Award size={18} />} accent="text-violet-600" />
                </div>

                {/* Today focus + tracker (reflection-first) */}
                <TodayFocus />
                <DailyTrackerPanel studentId={currentUser.id} />
                <FeedbackHighlights studentId={currentUser.id} />
                <ProjectsPanel studentId={currentUser.id} />
                <BadgesLeaderboard studentId={currentUser.id} />
            </div>
        </DashboardLayout>
    );
}
