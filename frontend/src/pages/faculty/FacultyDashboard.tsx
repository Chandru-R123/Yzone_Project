import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MOCK_REVIEW_WINDOWS, MOCK_STUDENTS, MOCK_TRACKER_ENTRIES, MOCK_PROJECTS } from '../../data/mockData';
import { useCohort } from '../../context/CohortContext';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Lock, CheckCircle2, Star, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function FacultyDashboard() {
    const { selectedCohort } = useCohort();
    const { currentUser } = useAuth();
    const cohortId = selectedCohort?.id ?? 'c1';

    const activeWindow = MOCK_REVIEW_WINDOWS.find(w => w.cohortId === cohortId && w.isActive);
    const participants = MOCK_STUDENTS.filter(s => activeWindow?.participants.includes(s.id));

    const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
    const [feedbackModal, setFeedbackModal] = useState<typeof participants[0] | null>(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [scores, setScores] = useState<Record<string, number>>({});
    const [rubricScores, setRubricScores] = useState<Record<string, Record<string, number>>>({});

    const submitFeedback = (studentId: string) => {
        if (!feedbackText.trim()) return;
        setFeedbackSubmitted(prev => ({ ...prev, [studentId]: true }));
        setFeedbackModal(null);
        setFeedbackText('');
    };

    if (!activeWindow) {
        return (
            <DashboardLayout title="Review Dashboard" subtitle="Faculty / Mentor review portal">
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Lock size={40} className="text-gray-300 mb-4 stroke-1" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Review Window</h3>
                    <p className="text-muted text-sm max-w-xs">The facilitator has not opened a review window yet. Please check back later.</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Review Dashboard" subtitle="Faculty / Mentor review portal">
            <div className="space-y-5 max-w-4xl">
                {/* Window info */}
                <Card className="border-l-4 border-l-emerald-500 animate-fadeIn">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Star size={18} className="text-emerald-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="section-title">Active Review Window</h3>
                                <Badge variant="green">Open</Badge>
                            </div>
                            <p className="text-sm text-muted mt-0.5">
                                {new Date(activeWindow.startTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                {' → '}
                                {new Date(activeWindow.endTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {activeWindow.rubricDimensions.map(d => (
                                    <span key={d} className="badge-blue text-xs">{d}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Assigned students */}
                <div>
                    <h3 className="section-title mb-3">Assigned Students ({participants.length})</h3>
                    <div className="space-y-3">
                        {participants.map(student => {
                            const trackers = MOCK_TRACKER_ENTRIES.filter(t => t.studentId === student.id).slice(0, 3);
                            const projects = MOCK_PROJECTS.filter(p => p.studentId === student.id);
                            const submitted = feedbackSubmitted[student.id];

                            return (
                                <Card key={student.id} className="animate-fadeIn">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{student.name}</p>
                                                <p className="text-xs text-muted">{student.team} · {student.department}</p>
                                            </div>
                                        </div>
                                        {submitted ? (
                                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium">
                                                <CheckCircle2 size={12} /> Submitted
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setFeedbackModal(student)}
                                                className="btn-primary btn-sm"
                                            >
                                                <BookOpen size={13} /> Give Feedback
                                            </button>
                                        )}
                                    </div>

                                    {/* Tracker history (read-only) */}
                                    <div className="border-t border-gray-100 pt-3">
                                        <p className="text-xs font-semibold text-muted mb-2">Recent Tracker (read-only)</p>
                                        <div className="space-y-1.5">
                                            {trackers.filter(t => t.submittedAt).map(t => (
                                                <div key={t.id} className="text-xs bg-gray-50 rounded-lg p-2">
                                                    <span className="font-medium text-gray-600">{t.date}:</span>
                                                    <span className="text-gray-500 ml-1 line-clamp-1">{t.learnings}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Projects */}
                                    {projects.length > 0 && (
                                        <div className="border-t border-gray-100 pt-3 mt-3">
                                            <p className="text-xs font-semibold text-muted mb-2">Project Artefacts</p>
                                            <div className="flex flex-wrap gap-2">
                                                {projects.map(p => (
                                                    <span key={p.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                                                        {p.type === 'mini' ? '📦' : '🚀'} {p.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            <Modal
                isOpen={!!feedbackModal}
                onClose={() => setFeedbackModal(null)}
                title={`Feedback — ${feedbackModal?.name ?? ''}`}
                size="lg"
                footer={
                    <>
                        <button className="btn-secondary btn-sm" onClick={() => setFeedbackModal(null)}>Cancel</button>
                        <button
                            className="btn-primary btn-sm"
                            onClick={() => feedbackModal && submitFeedback(feedbackModal.id)}
                            disabled={!feedbackText.trim()}
                        >
                            <CheckCircle2 size={14} /> Submit (Cannot Edit After)
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2">
                        <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700">You cannot edit feedback after submission. Other evaluators are not visible to you.</p>
                    </div>

                    {/* Rubric scores */}
                    <div>
                        <label className="input-label">Rubric Dimensions (Optional Score 0–10)</label>
                        <div className="space-y-2">
                            {activeWindow.rubricDimensions.map(dim => (
                                <div key={dim} className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 w-44 flex-shrink-0">{dim}</span>
                                    <input
                                        type="range" min={0} max={10} step={1}
                                        value={rubricScores[feedbackModal?.id ?? '']?.[dim] ?? 5}
                                        onChange={e => setRubricScores(prev => ({
                                            ...prev,
                                            [feedbackModal?.id ?? '']: { ...prev[feedbackModal?.id ?? ''], [dim]: Number(e.target.value) }
                                        }))}
                                        className="flex-1 accent-primary-600"
                                    />
                                    <span className="w-6 text-sm font-semibold text-gray-700 text-right">
                                        {rubricScores[feedbackModal?.id ?? '']?.[dim] ?? 5}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Qualitative feedback - mandatory */}
                    <div>
                        <label className="input-label">
                            Qualitative Feedback <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={5}
                            className={clsx('textarea', !feedbackText && 'border-red-300 focus:ring-red-200')}
                            placeholder="Provide detailed qualitative feedback on the student's performance, strengths, and areas for improvement…"
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                        />
                        {!feedbackText && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} /> Qualitative feedback is mandatory.</p>
                        )}
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
