import React, { useState, useEffect } from 'react';
import { Issue, Status, Priority } from '../types';
import { STATUSES, PRIORITIES, ASSIGNEES } from '../constants';
import Modal from './ui/Modal';

interface IssueFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'> | Issue) => void;
    issue: Issue | null;
}

const IssueFormModal: React.FC<IssueFormModalProps> = ({ isOpen, onClose, onSave, issue }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: Status.OPEN,
        priority: Priority.MEDIUM,
        assignee: ASSIGNEES[0] || '',
    });

    useEffect(() => {
        if (issue) {
            setFormData({
                title: issue.title,
                description: issue.description,
                status: issue.status,
                priority: issue.priority,
                assignee: issue.assignee,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: Status.OPEN,
                priority: Priority.MEDIUM,
                assignee: ASSIGNEES[0] || '',
            });
        }
    }, [issue, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (issue) {
            onSave({ ...issue, ...formData });
        } else {
            onSave(formData);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={issue ? 'Edit Issue' : 'Create Issue'}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent dark:text-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
                            >
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                            <select
                                name="priority"
                                id="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
                            >
                                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assignee</label>
                            <select
                                name="assignee"
                                id="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
                            >
                                {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-sm font-medium"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default IssueFormModal;