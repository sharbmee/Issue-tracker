import React from 'react';
import { Issue, SortConfig } from '../types';
import Badge from './ui/Badge';
import { SortIcon } from './icons/SortIcon';
import { EditIcon } from './icons/EditIcon';

interface IssueTableProps {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  sortConfig: SortConfig;
  onSort: (key: keyof Issue) => void;
  onEdit: (issue: Issue) => void;
  onView: (issue: Issue) => void;
}

const TableHeader: React.FC<{
    columnKey: keyof Issue;
    label: string;
    sortConfig: SortConfig;
    onSort: (key: keyof Issue) => void;
}> = ({ columnKey, label, sortConfig, onSort }) => {
    const isSorted = sortConfig.key === columnKey;
    return (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none group"
            onClick={() => onSort(columnKey)}
        >
            <div className="flex items-center gap-2">
                {label}
                <SortIcon
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                    direction={isSorted ? sortConfig.direction : undefined}
                />
            </div>
        </th>
    );
};

const IssueTable: React.FC<IssueTableProps> = ({ issues, loading, error, sortConfig, onSort, onEdit, onView }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, issue: Issue) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        onView(issue);
    };

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                Loading issues...
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md">{error}</div>;
    }

    if (issues.length === 0) {
        return <div className="text-center py-10 text-gray-500 dark:text-gray-400">No issues found.</div>;
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                    <TableHeader columnKey="id" label="ID" sortConfig={sortConfig} onSort={onSort} />
                    <TableHeader columnKey="title" label="Title" sortConfig={sortConfig} onSort={onSort} />
                    <TableHeader columnKey="status" label="Status" sortConfig={sortConfig} onSort={onSort} />
                    <TableHeader columnKey="priority" label="Priority" sortConfig={sortConfig} onSort={onSort} />
                    <TableHeader columnKey="assignee" label="Assignee" sortConfig={sortConfig} onSort={onSort} />
                    <TableHeader columnKey="updatedAt" label="Last Updated" sortConfig={sortConfig} onSort={onSort} />
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {issues.map((issue) => (
                    <tr 
                        key={issue.id} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                        onClick={(e) => handleRowClick(e, issue)}
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">{issue.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">{issue.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm"><Badge status={issue.status} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm"><Badge priority={issue.priority} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{issue.assignee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(issue.updatedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => onEdit(issue)}
                                className="text-primary-600 hover:text-primary-800 dark:hover:text-primary-400 flex items-center gap-1"
                            >
                                <EditIcon className="w-4 h-4" />
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IssueTable;