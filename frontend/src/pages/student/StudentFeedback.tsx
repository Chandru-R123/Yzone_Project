import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { MOCK_FEEDBACK } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';

export default function StudentFeedback() {
    const { currentUser } = useAuth();
    const feedbacks = MOCK_FEEDBACK.filter(f => f.toStudentId === currentUser?.id);

    return (
        <DashboardLayout title="Feedback" subtitle="Remarks from facilitators and mentors">
            <div className="max-w-2xl mx-auto space-y-4">
                {feedbacks.length === 0 && (
                    <div className="text-center py-16 text-muted">
                        <MessageSquare size={32} className="mx-auto mb-3 stroke-1 text-gray-300" />
                        <p>No feedback yet.</p>
                    </div>
                )}
                {feedbacks.map(fb => (
                    <Card key={fb.id} className="animate-fadeIn">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                                {fb.fromName.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-gray-800 text-sm">{fb.fromName}</span>
                                    <span className="text-xs text-muted capitalize">({fb.fromRole})</span>
                                    <span className="text-xs text-muted ml-auto">
                                        {new Date(fb.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                {fb.score && (
                                    <span className="inline-block mt-1 text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                                        Score: {fb.score}/100
                                    </span>
                                )}
                                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{fb.message}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
