import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/Badge';
import { useCohort } from '../../context/CohortContext';
import { MOCK_STUDENTS, MOCK_SESSIONS, MOCK_ATTENDANCE } from '../../data/mockData';
import type { AttendanceRecord, AttendanceStatus } from '../../types';
import { Lock, Save, Info } from 'lucide-react';
import { clsx } from 'clsx';

type AttCell = {
    studentId: string;
    sessionId: string;
    status: AttendanceStatus;
    reason?: string;
};

const STATUS_CLASS: Record<AttendanceStatus, string> = {
    present: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
    absent: 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200',
    reason: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
};

const STATUS_LABEL: Record<AttendanceStatus, string> = {
    present: 'P', absent: 'A', reason: 'E',
};

const CYCLE: AttendanceStatus[] = ['present', 'absent', 'reason'];

function isLocked(sessionDate: string) {
    const sDate = new Date(sessionDate);
    const diff = (Date.now() - sDate.getTime()) / (1000 * 60 * 60);
    return diff > 48;
}

export default function AttendanceScreen() {
    const { selectedCohort } = useCohort();
    const cohortId = selectedCohort?.id ?? 'c1';

    const students = MOCK_STUDENTS.filter(s => s.cohortId === cohortId);
    const sessions = MOCK_SESSIONS.filter(s => s.cohortId === cohortId);

    const [cells, setCells] = useState<Record<string, AttCell>>(() => {
        const map: Record<string, AttCell> = {};
        MOCK_ATTENDANCE.forEach(a => {
            map[`${a.studentId}_${a.sessionId}`] = { studentId: a.studentId, sessionId: a.sessionId, status: a.status, reason: a.reason };
        });
        return map;
    });

    const [reasonModal, setReasonModal] = useState<{ key: string } | null>(null);
    const [reasonText, setReasonText] = useState('');
    const [saved, setSaved] = useState(false);

    const toggle = (studentId: string, session: typeof sessions[0]) => {
        if (isLocked(session.date)) return;
        const key = `${studentId}_${session.id}`;
        const current = cells[key]?.status ?? 'absent';
        const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
        setCells(prev => ({ ...prev, [key]: { studentId, sessionId: session.id, status: next } }));
        setSaved(false);
    };

    const saveReason = () => {
        if (!reasonModal) return;
        setCells(prev => ({ ...prev, [reasonModal.key]: { ...prev[reasonModal.key], reason: reasonText } }));
        setReasonModal(null);
        setReasonText('');
    };

    return (
        <DashboardLayout title="Attendance" subtitle="Click cells to toggle P/A/E. Locked after 48 hrs.">
            <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        {(['present', 'absent', 'reason'] as const).map(s => (
                            <span key={s} className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs', STATUS_CLASS[s])}>
                                {STATUS_LABEL[s]} = {s}
                            </span>
                        ))}
                        <span className="flex items-center gap-1 text-gray-400"><Lock size={12} /> Locked after 48h</span>
                    </div>
                    <button
                        onClick={() => setSaved(true)}
                        className="btn-primary btn-sm ml-auto"
                    >
                        <Save size={14} />
                        {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>

                {/* Matrix table - horizontally scrollable */}
                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[600px]">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide sticky left-0 bg-gray-50 border-r border-gray-100">Student</th>
                                    {sessions.map(sess => (
                                        <th key={sess.id} className="px-3 py-3 text-center text-xs font-medium text-muted uppercase whitespace-nowrap">
                                            <div>{new Date(sess.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                                            <div className="font-normal normal-case text-gray-400">{sess.title.split(' ').slice(0, 2).join(' ')}</div>
                                            {isLocked(sess.date) && <Lock size={10} className="mx-auto mt-0.5 text-gray-300" />}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, idx) => (
                                    <tr key={student.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="px-4 py-2.5 font-medium text-gray-800 sticky left-0 bg-inherit border-r border-gray-100 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                                                    {student.name.charAt(0)}
                                                </div>
                                                {student.name.split(' ')[0]}
                                            </div>
                                        </td>
                                        {sessions.map(sess => {
                                            const key = `${student.id}_${sess.id}`;
                                            const cell = cells[key];
                                            const status: AttendanceStatus = cell?.status ?? 'absent';
                                            const locked = isLocked(sess.date);
                                            return (
                                                <td key={sess.id} className="px-2 py-2 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            onClick={() => toggle(student.id, sess)}
                                                            disabled={locked}
                                                            className={clsx(
                                                                'w-7 h-7 rounded-md text-xs font-bold border transition-all duration-150',
                                                                STATUS_CLASS[status],
                                                                locked && 'opacity-50 cursor-not-allowed'
                                                            )}
                                                        >
                                                            {STATUS_LABEL[status]}
                                                        </button>
                                                        {status === 'reason' && !locked && (
                                                            <button
                                                                onClick={() => { setReasonModal({ key }); setReasonText(cell?.reason ?? ''); }}
                                                                className="text-purple-400 hover:text-purple-600 transition-colors"
                                                            >
                                                                <Info size={12} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <Modal
                isOpen={!!reasonModal}
                onClose={() => setReasonModal(null)}
                title="Add Excuse Reason"
                size="sm"
                footer={
                    <>
                        <button className="btn-secondary btn-sm" onClick={() => setReasonModal(null)}>Cancel</button>
                        <button className="btn-primary btn-sm" onClick={saveReason}>Save</button>
                    </>
                }
            >
                <label className="input-label">Reason for excused absence</label>
                <textarea
                    rows={3}
                    className="textarea"
                    value={reasonText}
                    onChange={e => setReasonText(e.target.value)}
                    placeholder="E.g. Medical appointment, family emergency…"
                />
            </Modal>
        </DashboardLayout>
    );
}
