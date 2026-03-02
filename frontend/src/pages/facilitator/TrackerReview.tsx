import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MOCK_TRACKER_ENTRIES, MOCK_STUDENTS } from '../../data/mockData';
import { useCohort } from '../../context/CohortContext';
import { MessageSquare, Flag, Tag, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import type { TrackerEntry } from '../../types';

type FilterState = {
    date: string;
    student: string;
    late: boolean | null;
};

export default function TrackerReview() {
    const { selectedCohort } = useCohort();
    const cohortId = selectedCohort?.id ?? 'c1';

    const students = MOCK_STUDENTS.filter(s => s.cohortId === cohortId);
    const [filters, setFilters] = useState<FilterState>({ date: '', student: '', late: null });
    const [entries, setEntries] = useState(MOCK_TRACKER_ENTRIES.filter(t => t.cohortId === cohortId));
    const [remarkModal, setRemarkModal] = useState<TrackerEntry | null>(null);
    const [remark, setRemark] = useState('');

    const filtered = entries.filter(e => {
        if (filters.date && e.date !== filters.date) return false;
        if (filters.student && e.studentId !== filters.student) return false;
        if (filters.late === true && !e.isLate) return false;
        if (filters.late === false && e.isLate) return false;
        return true;
    });

    const addRemark = () => {
        if (!remarkModal) return;
        setEntries(prev => prev.map(e => e.id === remarkModal.id ? { ...e, remark } : e));
        setRemarkModal(null);
        setRemark('');
    };

    const toggleFlag = (id: string, field: 'needsFollowUp' | 'flaggedForMentor') => {
        setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: !e[field] } : e));
    };

    const studentName = (id: string) => students.find(s => s.id === id)?.name ?? id;

    return (
        <DashboardLayout title="Tracker Review" subtitle="Review and annotate student reflections">
            <div className="space-y-4">
                {/* Filters */}
                <Card>
                    <div className="flex items-center gap-2 mb-3">
                        <Filter size={16} className="text-primary-500" />
                        <h3 className="text-sm font-semibold">Filters</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div>
                            <label className="input-label">Date</label>
                            <input type="date" className="input w-40" value={filters.date} onChange={e => setFilters(f => ({ ...f, date: e.target.value }))} />
                        </div>
                        <div>
                            <label className="input-label">Student</label>
                            <select className="input w-44" value={filters.student} onChange={e => setFilters(f => ({ ...f, student: e.target.value }))}>
                                <option value="">All</option>
                                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="input-label">Status</label>
                            <select className="input w-36" value={filters.late === null ? '' : String(filters.late)} onChange={e => setFilters(f => ({ ...f, late: e.target.value === '' ? null : e.target.value === 'true' }))}>
                                <option value="">All</option>
                                <option value="true">Late</option>
                                <option value="false">On Time</option>
                            </select>
                        </div>
                        <button className="btn-outline btn-sm self-end" onClick={() => setFilters({ date: '', student: '', late: null })}>
                            Clear
                        </button>
                    </div>
                </Card>

                {/* Tracker entries */}
                <div className="space-y-3">
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-muted">No entries match the filters.</div>
                    )}
                    {filtered.map(entry => {
                        const isEmpty = !entry.submittedAt;
                        return (
                            <Card key={entry.id} className={clsx('animate-fadeIn', isEmpty && 'opacity-60')}>
                                <div className="flex items-start gap-3">
                                    <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                                        isEmpty ? 'bg-gray-100' : entry.isLate ? 'bg-amber-100' : 'bg-green-100'
                                    )}>
                                        {isEmpty ? <AlertCircle size={16} className="text-gray-400" /> :
                                            entry.isLate ? <Clock size={16} className="text-amber-600" /> :
                                                <CheckCircle2 size={16} className="text-green-600" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="text-sm font-semibold text-gray-800">{studentName(entry.studentId)}</span>
                                            <span className="text-xs text-muted">{entry.date}</span>
                                            {entry.isLate && <Badge variant="yellow">Late</Badge>}
                                            {isEmpty && <Badge variant="red">Missing</Badge>}
                                            {entry.needsFollowUp && <Badge variant="red">Follow-up</Badge>}
                                            {entry.flaggedForMentor && <Badge variant="purple">Mentor Review</Badge>}
                                        </div>

                                        {!isEmpty && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                                                {[
                                                    { label: 'Learnings', val: entry.learnings, color: 'blue' },
                                                    { label: 'Challenges', val: entry.challenges, color: 'amber' },
                                                    { label: 'Plans', val: entry.plans, color: 'green' },
                                                ].map(f => (
                                                    <div key={f.label} className={`p-2 bg-${f.color}-50 rounded-lg`}>
                                                        <p className={`text-xs font-medium text-${f.color}-600 mb-0.5`}>{f.label}</p>
                                                        <p className="text-xs text-gray-700 line-clamp-2">{f.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {entry.remark && (
                                            <div className="mt-2 p-2 bg-primary-50 rounded-lg text-xs text-primary-700">
                                                💬 <span className="font-medium">Remark:</span> {entry.remark}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1.5 flex-shrink-0">
                                        <button
                                            onClick={() => { setRemarkModal(entry); setRemark(entry.remark ?? ''); }}
                                            className="p-1.5 rounded-md text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                            title="Add remark"
                                        >
                                            <MessageSquare size={15} />
                                        </button>
                                        <button
                                            onClick={() => toggleFlag(entry.id, 'needsFollowUp')}
                                            className={clsx('p-1.5 rounded-md transition-colors', entry.needsFollowUp ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50')}
                                            title="Flag for follow-up"
                                        >
                                            <Flag size={15} />
                                        </button>
                                        <button
                                            onClick={() => toggleFlag(entry.id, 'flaggedForMentor')}
                                            className={clsx('p-1.5 rounded-md transition-colors', entry.flaggedForMentor ? 'text-purple-500 bg-purple-50' : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50')}
                                            title="Tag for mentor review"
                                        >
                                            <Tag size={15} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <Modal
                isOpen={!!remarkModal}
                onClose={() => setRemarkModal(null)}
                title={`Add Remark — ${remarkModal ? studentName(remarkModal.studentId) : ''}`}
                size="md"
                footer={
                    <>
                        <button className="btn-secondary btn-sm" onClick={() => setRemarkModal(null)}>Cancel</button>
                        <button className="btn-primary btn-sm" onClick={addRemark}>Save Remark</button>
                    </>
                }
            >
                <label className="input-label">Remark / Feedback</label>
                <textarea
                    rows={4}
                    className="textarea"
                    placeholder="Enter your remark for this tracker entry…"
                    value={remark}
                    onChange={e => setRemark(e.target.value)}
                />
            </Modal>
        </DashboardLayout>
    );
}
