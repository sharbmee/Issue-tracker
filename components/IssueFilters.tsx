import React, { useState, useEffect } from 'react';
import { Filters } from '../types';
import { STATUSES, PRIORITIES, ASSIGNEES } from '../constants';

interface IssueFiltersProps {
    filters: Filters;
    searchTerm: string;
    onFilterChange: (newFilters: Partial<Filters>) => void;
    onSearch: (term: string) => void;
}

const IssueFilters: React.FC<IssueFiltersProps> = ({ filters, searchTerm, onFilterChange, onSearch }) => {
    const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (internalSearchTerm !== searchTerm) {
                onSearch(internalSearchTerm);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [internalSearchTerm, onSearch, searchTerm]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <input
                type="text"
                placeholder="Search by title..."
                value={internalSearchTerm}
                onChange={(e) => setInternalSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <select
                value={filters.status}
                onChange={(e) => onFilterChange({ status: e.target.value as Filters['status'] })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                <option value="">All Statuses</option>
                {STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <select
                value={filters.priority}
                onChange={(e) => onFilterChange({ priority: e.target.value as Filters['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                <option value="">All Priorities</option>
                {PRIORITIES.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                ))}
            </select>
            <select
                value={filters.assignee}
                onChange={(e) => onFilterChange({ assignee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                <option value="">All Assignees</option>
                {ASSIGNEES.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                ))}
            </select>
        </div>
    );
};

export default IssueFilters;