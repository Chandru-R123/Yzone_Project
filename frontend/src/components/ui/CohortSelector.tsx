import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCohort } from '../../context/CohortContext';

export function CohortSelector() {
    const { cohorts, selectedCohort, selectCohort } = useCohort();

    if (cohorts.length === 0) return null;

    return (
        <div className="relative inline-block">
            <div className="relative">
                <select
                    id="cohort-selector"
                    value={selectedCohort?.id ?? ''}
                    onChange={e => selectCohort(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium
                     pl-3 pr-9 py-2 rounded-lg shadow-card cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400
                     transition-all duration-200 hover:border-gray-300"
                >
                    {cohorts.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
