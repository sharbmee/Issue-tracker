import React from 'react';
import { Issue } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface IssueDetailDrawerProps {
    issue: Issue | null;
    onClose: () => void;
}

const IssueDetailDrawer: React.FC<IssueDetailDrawerProps> = ({ issue, onClose }) => {
    const isOpen = issue !== null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {issue && (
                    <div className="h-full flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Issue Details: {issue.id}</h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                            <pre className="text-sm bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-200 p-4 rounded-md overflow-x-auto">
                                {JSON.stringify(issue, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default IssueDetailDrawer;