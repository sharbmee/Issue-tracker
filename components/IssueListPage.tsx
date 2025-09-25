import React, { useState, useEffect, useCallback } from 'react';
import { Issue, Filters, SortConfig, PaginationState } from '../types';
import { issueService } from '../services/issueService';
import IssueTable from './IssueTable';
import IssueFilters from './IssueFilters';
import Pagination from './Pagination';
import IssueFormModal from './IssueFormModal';
import IssueDetailDrawer from './IssueDetailDrawer';
import { PlusIcon } from './icons/PlusIcon';

const IssueListPage: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [totalIssues, setTotalIssues] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({ status: '', priority: '', assignee: '' });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'updatedAt', direction: 'descending' });
    const [pagination, setPagination] = useState<PaginationState>({ page: 1, pageSize: 10 });

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

    const [viewingIssue, setViewingIssue] = useState<Issue | null>(null);

    const fetchIssues = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await issueService.getIssues(searchTerm, filters, sortConfig, pagination);
            setIssues(result.issues);
            setTotalIssues(result.total);
        } catch (err) {
            setError('Failed to fetch issues.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filters, sortConfig, pagination]);

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    const handleSort = (key: keyof Issue) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setPagination(p => ({ ...p, page: 1 }));
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPagination(p => ({ ...p, page: 1 }));
    };

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters(f => ({ ...f, ...newFilters }));
        setPagination(p => ({ ...p, page: 1 }));
    };

    const handleCreateIssue = () => {
        setEditingIssue(null);
        setIsFormModalOpen(true);
    };

    const handleEditIssue = (issue: Issue) => {
        setEditingIssue(issue);
        setIsFormModalOpen(true);
    };

    const handleViewIssue = (issue: Issue) => {
        setViewingIssue(issue);
    };

    const handleFormSave = async (issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'> | Issue) => {
        if ('id' in issueData) {
            await issueService.updateIssue(issueData.id, issueData);
        } else {
            await issueService.createIssue(issueData);
        }
        fetchIssues();
        setIsFormModalOpen(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Issues ({totalIssues})</h2>
                <button
                    onClick={handleCreateIssue}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Issue
                </button>
            </div>

            <IssueFilters
                filters={filters}
                searchTerm={searchTerm}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />

            <div className="overflow-x-auto">
                <IssueTable
                    issues={issues}
                    loading={loading}
                    error={error}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onEdit={handleEditIssue}
                    onView={handleViewIssue}
                />
            </div>
            
            {totalIssues > 0 && (
                <Pagination
                    currentPage={pagination.page}
                    totalItems={totalIssues}
                    pageSize={pagination.pageSize}
                    onPageChange={(page) => setPagination(p => ({ ...p, page }))}
                    onPageSizeChange={(size) => setPagination({ page: 1, pageSize: size })}
                />
            )}
            
            <IssueFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleFormSave}
                issue={editingIssue}
            />
            
            <IssueDetailDrawer
                issue={viewingIssue}
                onClose={() => setViewingIssue(null)}
            />
        </div>
    );
};

export default IssueListPage;