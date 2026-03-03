import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, GraduationCap, Users, BookOpen, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

const ROLES: { role: Role; label: string; desc: string; color: string; icon: React.ReactNode; route: string }[] = [
    { role: 'student', label: 'Student', desc: 'Track progress, submit reflections, view projects', color: 'from-blue-500 to-blue-600', icon: <GraduationCap size={22} />, route: '/student' },
    { role: 'facilitator', label: 'Facilitator', desc: 'Manage attendance, tracker review, review windows', color: 'from-violet-500 to-violet-600', icon: <Users size={22} />, route: '/facilitator' },
    { role: 'faculty', label: 'Faculty / Mentor', desc: 'Review projects and provide feedback to students', color: 'from-emerald-500 to-emerald-600', icon: <BookOpen size={22} />, route: '/faculty' },
    { role: 'executive', label: 'TYN Executive', desc: 'Cross-cohort insights, engagement, and risk flags', color: 'from-orange-500 to-orange-600', icon: <BarChart3 size={22} />, route: '/executive' },
];

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<Role | null>(null);

    const handleLogin = (role: Role, route: string) => {
        setLoading(role);
        setTimeout(() => {
            login(role);
            navigate(route);
            setLoading(null);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg mb-4">
                        <Zap size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">YZone</h1>
                    <p className="text-blue-200/70 mt-1 text-sm">Cohort Management Platform</p>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <p className="text-white/80 text-center text-sm mb-5 font-medium">
                        Select your role to continue
                    </p>

                    <div className="space-y-3">
                        {ROLES.map(({ role, label, desc, color, icon, route }) => (
                            <button
                                key={role}
                                id={`login-${role}`}
                                onClick={() => handleLogin(role, route)}
                                disabled={loading !== null}
                                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25
                           transition-all duration-200 group text-left disabled:opacity-60"
                            >
                                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                                    {icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold text-sm">{label}</p>
                                    <p className="text-white/55 text-xs mt-0.5 leading-snug">{desc}</p>
                                </div>
                                <div className={`text-white/40 group-hover:text-white/80 transition-all duration-200 ${loading === role ? 'animate-spin' : 'group-hover:translate-x-0.5'}`}>
                                    {loading === role ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    ) : (
                                        <ChevronRight size={18} />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-white/30 text-xs mt-5">
                        Demo mode — no authentication required
                    </p>
                </div>
            </div>
        </div>
    );
}
