import React from 'react';
import { Bell, Search } from 'lucide-react';
import { CohortSelector } from '../ui/CohortSelector';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
    title: string;
    subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
    const { currentUser } = useAuth();

    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3">
            <div className="flex items-center justify-between gap-4">
                {/* Title */}
                <div className="min-w-0 pl-10 lg:pl-0">
                    <h2 className="text-base font-semibold text-gray-800 truncate">{title}</h2>
                    {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <CohortSelector />
                    <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-150">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                        {currentUser?.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
