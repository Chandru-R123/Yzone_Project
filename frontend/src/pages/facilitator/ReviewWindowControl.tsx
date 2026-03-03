import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { MOCK_REVIEW_WINDOWS, MOCK_STUDENTS } from '../../data/mockData';
import { useCohort } from '../../context/CohortContext';
import { Star, Lock, Unlock, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import type { ReviewWindow } from '../../types';

export default function ReviewWindowControl() {
    const { selectedCohort } = useCohort();
    const cohortId = selectedCohort?.id ?? 'c1';

    const [windows, setWindows] = useState<ReviewWindow[]>(MOCK_REVIEW_WINDOWS.filter(w => w.cohortId === cohortId));
    const [createModal, setCreateModal] = useState(false);
    const [auditWindow, setAuditWindow] = useState<ReviewWindow | null>(null);
    const [newWindow, setNewWindow] = useState({ startTime: '', endTime: '', participants: [] as string[] });

    const students = MOCK_STUDENTS.filter(s => s.cohortId === cohortId);

    const toggleLock = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
    };

    const createWindow = () => {
        setWindows(prev => [...prev, {
            id: `rw_${Date.now()}`,
            cohortId,
            startTime: newWindow.startTime,
            endTime: newWindow.endTime,
            participants: newWindow.participants,
            rubricDimensions: ['Technical Skills', 'Problem Solving', 'Communication', 'Code Quality'],
            isActive: true,
            createdBy: 'f1',
        }]);
        setCreateModal(false);
        setNewWindow({ startTime: '', endTime: '', participants: [] });
    };

    const AUDIT_LOG = [
        { time: '2025-02-27T09:05:00', actor: 'Meera Pillai', action: 'Created review window' },
        { time: '2025-02-27T09:10:00', actor: 'Meera Pillai', action: 'Added 4 participants' },
        { time: '2025-02-27T09:15:00', actor: 'Meera Pillai', action: 'Set rubric: 5 dimensions' },
    ];

    return (
        <DashboardLayout title="Review Window Control" subtitle="Enable, configure, and lock review windows">
            <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between">
                    <h3 className="section-title">Review Windows</h3>
                    <button onClick={() => setCreateModal(true)} className="btn-primary btn-sm">
                        <Star size={14} /> New Window
                    </button>
                </div>

                {windows.map(w => {
                    const participantStudents = MOCK_STUDENTS.filter(s => w.participants.includes(s.id));
                    const now = new Date();
                    const start = new Date(w.startTime);
                    const end = new Date(w.endTime);
                    const isExpired = end < now;

                    return (
                        <Card key={w.id} className="animate-fadeIn">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={w.isActive && !isExpired ? 'green' : 'gray'}>
                                            {isExpired ? 'Expired' : w.isActive ? 'Active' : 'Locked'}
                                        </Badge>
                                        <span className="text-xs text-muted">Created by Meera Pillai</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                                        <Clock size={14} className="text-muted" />
                                        <span>
                                            {new Date(w.startTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            {' → '}
                                            {new Date(w.endTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setAuditWindow(w)}
                                        className="btn-outline btn-sm"
                                    >
                                        <FileText size={13} /> Audit Log
                                    </button>
                                    <button
                                        onClick={() => toggleLock(w.id)}
                                        disabled={isExpired}
                                        className={clsx('btn-sm', w.isActive ? 'btn-danger' : 'btn-primary')}
                                    >
                                        {w.isActive ? <><Lock size={13} /> Lock</> : <><Unlock size={13} /> Enable</>}
                                    </button>
                                </div>
                            </div>

                            {/* Participants */}
                            <div className="mb-3">
                                <p className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1"><Users size={12} /> Participants ({w.participants.length})</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {participantStudents.map(s => (
                                        <span key={s.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{s.name}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Rubric */}
                            <div>
                                <p className="text-xs font-medium text-muted mb-1.5">Rubric Dimensions</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {w.rubricDimensions.map(d => (
                                        <span key={d} className="text-xs badge-blue">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {windows.length === 0 && (
                    <div className="text-center py-16 text-muted">
                        <Star size={32} className="mx-auto mb-3 stroke-1 text-gray-300" />
                        <p>No review windows yet. Create one to get started.</p>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={createModal}
                onClose={() => setCreateModal(false)}
                title="Create Review Window"
                size="md"
                footer={
                    <>
                        <button className="btn-secondary btn-sm" onClick={() => setCreateModal(false)}>Cancel</button>
                        <button className="btn-primary btn-sm" onClick={createWindow} disabled={!newWindow.startTime || !newWindow.endTime}>
                            Create Window
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="input-label">Start Date & Time</label>
                        <input type="datetime-local" className="input" value={newWindow.startTime} onChange={e => setNewWindow(p => ({ ...p, startTime: e.target.value }))} />
                    </div>
                    <div>
                        <label className="input-label">End Date & Time</label>
                        <input type="datetime-local" className="input" value={newWindow.endTime} onChange={e => setNewWindow(p => ({ ...p, endTime: e.target.value }))} />
                    </div>
                    <div>
                        <label className="input-label">Select Participants</label>
                        <div className="mt-1 space-y-1 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
                            {students.map(s => (
                                <label key={s.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-md">
                                    <input
                                        type="checkbox"
                                        checked={newWindow.participants.includes(s.id)}
                                        onChange={e => {
                                            setNewWindow(p => ({
                                                ...p,
                                                participants: e.target.checked
                                                    ? [...p.participants, s.id]
                                                    : p.participants.filter(id => id !== s.id)
                                            }));
                                        }}
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">{s.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Audit Log Modal */}
            <Modal
                isOpen={!!auditWindow}
                onClose={() => setAuditWindow(null)}
                title="Audit Log"
                size="sm"
            >
                <div className="space-y-2">
                    {AUDIT_LOG.map((log, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-gray-800">{log.action}</p>
                                <p className="text-xs text-muted">{log.actor} · {new Date(log.time).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </DashboardLayout>
    );
}
