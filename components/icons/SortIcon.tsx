import React from 'react';

// FIX: Changed props to extend HTMLAttributes for a div element instead of SVGProps.
interface SortIconProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'ascending' | 'descending';
}

export const SortIcon: React.FC<SortIconProps> = ({ direction, ...props }) => (
  <div className="flex flex-col" {...props}>
    <svg 
      className={`h-2 w-2 ${direction === 'ascending' ? 'text-gray-900 dark:text-gray-100' : ''}`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M10 3l-5 5h10l-5-5z" />
    </svg>
    <svg 
      className={`h-2 w-2 ${direction === 'descending' ? 'text-gray-900 dark:text-gray-100' : ''}`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M10 17l5-5H5l5 5z" />
    </svg>
  </div>
);