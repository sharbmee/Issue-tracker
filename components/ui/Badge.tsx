import React from 'react';
import { Status, Priority } from '../../types';

interface BadgeProps {
    status?: Status;
    priority?: Priority;
}

const Badge: React.FC<BadgeProps> = ({ status, priority }) => {
    let colorClasses = '';
    let text = '';

    if (status) {
        text = status;
        switch (status) {
            case Status.OPEN:
                colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-200';
                break;
            case Status.IN_PROGRESS:
                colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200';
                break;
            case Status.DONE:
                colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-200';
                break;
        }
    } else if (priority) {
        text = priority;
        switch (priority) {
            case Priority.LOW:
                colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
                break;
            case Priority.MEDIUM:
                colorClasses = 'bg-orange-100 text-orange-800 dark:bg-orange-900/70 dark:text-orange-200';
                break;
            case Priority.HIGH:
                colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-200';
                break;
        }
    }

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {text}
        </span>
    );
};

export default Badge;