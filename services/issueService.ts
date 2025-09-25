import { Issue, Status, Priority, Filters, SortConfig, PaginationState } from '../types';
import { ASSIGNEES } from '../constants';

const initialIssues: Issue[] = Array.from({ length: 123 }, (_, i) => {
  const id = `ISSUE-${i + 1}`;
  const now = new Date();
  const createdAt = new Date(now.getTime() - (123 - i) * 24 * 60 * 60 * 1000).toISOString();
  const updatedAt = new Date(now.getTime() - (Math.random() * (123 - i)) * 24 * 60 * 60 * 1000).toISOString();
  
  return {
    id,
    title: `Resolve bug in component #${i + 1}`,
    description: `Detailed description for the bug in component #${i + 1}. It involves a state management issue and needs to be addressed urgently. Steps to reproduce: 1. Open the app. 2. Navigate to the component. 3. See the error.`,
    status: i % 3 === 0 ? Status.DONE : i % 3 === 1 ? Status.IN_PROGRESS : Status.OPEN,
    priority: i % 3 === 0 ? Priority.LOW : i % 3 === 1 ? Priority.MEDIUM : Priority.HIGH,
    assignee: ASSIGNEES[i % ASSIGNEES.length],
    createdAt,
    updatedAt,
  };
});

let issues: Issue[] = [...initialIssues];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const issueService = {
  getIssues: async (
    searchTerm: string,
    filters: Filters,
    sortConfig: SortConfig,
    pagination: PaginationState
  ): Promise<{ issues: Issue[]; total: number }> => {
    await delay(300);

    let filteredIssues = [...issues];

    if (searchTerm) {
      filteredIssues = filteredIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      filteredIssues = filteredIssues.filter(issue => issue.status === filters.status);
    }
    if (filters.priority) {
      filteredIssues = filteredIssues.filter(issue => issue.priority === filters.priority);
    }
    if (filters.assignee) {
      filteredIssues = filteredIssues.filter(issue => issue.assignee === filters.assignee);
    }

    if (sortConfig.key) {
      filteredIssues.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    const total = filteredIssues.length;
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginatedIssues = filteredIssues.slice(start, end);

    return { issues: paginatedIssues, total };
  },

  getIssueById: async (id: string): Promise<Issue | undefined> => {
    await delay(200);
    return issues.find(issue => issue.id === id);
  },

  createIssue: async (newIssueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> => {
    await delay(400);
    const newIssue: Issue = {
      ...newIssueData,
      id: `ISSUE-${issues.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    issues = [newIssue, ...issues];
    return newIssue;
  },

  updateIssue: async (id: string, updatedData: Partial<Issue>): Promise<Issue | null> => {
    await delay(400);
    const issueIndex = issues.findIndex(issue => issue.id === id);
    if (issueIndex === -1) {
      return null;
    }
    const updatedIssue = {
      ...issues[issueIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    issues[issueIndex] = updatedIssue;
    return updatedIssue;
  },
};