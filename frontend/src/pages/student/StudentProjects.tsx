import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, StatCard } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { MOCK_PROJECTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Target, CheckCircle2, Circle, Calendar } from 'lucide-react';

export default function StudentProjects() {
    const { currentUser } = useAuth();
    const projects = MOCK_PROJECTS.filter(p => p.studentId === currentUser?.id);

    return (
        <DashboardLayout title="My Projects" subtitle="Mini & Major project tracking">
            <div className="max-w-4xl mx-auto space-y-5">
                {projects.map(p => {
                    const done = p.milestones.filter(m => m.completed).length;
                    const pct = Math.round((done / p.milestones.length) * 100);
                    return (
                        <Card key={p.id} variant="md" className="animate-fadeIn">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{p.type} Project</span>
                                        <StatusBadge status={p.status} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">{p.title}</h3>
                                    <p className="text-sm text-muted mt-0.5">{p.description}</p>
                                    {p.teamName && <span className="text-xs text-gray-500 mt-1 inline-block">Team: {p.teamName}</span>}
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-2xl font-bold text-primary-600">{pct}%</div>
                                    <div className="text-xs text-muted">complete</div>
                                </div>
                            </div>

                            <ProgressBar
                                value={done}
                                max={p.milestones.length}
                                color={pct < 40 ? 'bg-red-400' : pct < 70 ? 'bg-amber-400' : 'bg-green-500'}
                                label="Milestone progress"
                            />

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Milestones</h4>
                                <div className="space-y-2">
                                    {p.milestones.map(m => (
                                        <div key={m.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${m.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                                            {m.completed
                                                ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                                : <Circle size={16} className="text-gray-300 flex-shrink-0" />}
                                            <span className={`flex-1 text-sm ${m.completed ? 'line-through text-muted' : 'text-gray-700'}`}>{m.title}</span>
                                            <div className="flex items-center gap-1 text-xs text-muted">
                                                <Calendar size={11} />
                                                {new Date(m.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {p.feedback && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-xs font-medium text-blue-600 mb-0.5">Feedback</p>
                                    <p className="text-sm text-gray-700">{p.feedback}</p>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}
