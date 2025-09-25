# React Issue Tracker

A simple yet powerful issue tracking application built with React, TypeScript, and Tailwind CSS. It allows users to view, search, filter, sort, create, and update issues with a clean, responsive, and intuitive user interface.


## 🌍 Live Demo
Check out the deployed app on Vercel: [React Issue Tracker](https://issue-tracker-blond-tau.vercel.app/)

## ✨ Features

- **Comprehensive Issue List**: View all issues in a clean, sortable table.
- **Powerful Filtering & Searching**:
  - Live search by issue title.
  - Filter issues by status, priority, or assignee.
- **Sorting**: Sort the issue list by any column (ID, Title, Status, etc.).
- **Pagination**: Efficiently navigate through a large number of issues with page controls and customizable page size.
- **CRUD Operations**:
  - **Create**: Add new issues through an intuitive modal form.
  - **Read**: View detailed information for each issue in a slide-out drawer.
  - **Update**: Edit existing issues seamlessly.
- **Responsive Design**: A fully responsive layout that works on desktops, tablets, and mobile devices.
- **Dark Mode**: Switch between light and dark themes for comfortable viewing in any lighting condition. Theme preference is saved in local storage.
- **Modern UI/UX**: Built with Tailwind CSS for a professional and polished look and feel.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`, `useContext`)
- **Icons**: Custom SVG components for a crisp and lightweight icon set.
- **Mock API**: An asynchronous `issueService` simulates network latency for a realistic user experience without a backend.

## 📂 Project Structure

```

src
├── components/
│   ├── icons/               # SVG icon components
│   ├── ui/                  # Reusable UI elements (Badge, Modal)
│   ├── App.tsx              # Main application component
│   ├── IssueListPage.tsx    # Main page container
│   ├── IssueTable.tsx       # Table for displaying issues
│   ├── IssueFilters.tsx     # Filtering and search inputs
│   ├── Pagination.tsx       # Pagination controls
│   ├── IssueFormModal.tsx   # Modal for creating/editing issues
│   ├── IssueDetailDrawer.tsx # Drawer for viewing issue details
│   └── ThemeToggle.tsx      # Light/Dark mode switcher
│
├── constants.ts             # Application-wide constants (statuses, priorities)
├── contexts/
│   └── ThemeContext.tsx     # React Context for theme management
│
├── services/
│   └── issueService.ts      # Mock data service to simulate API calls
│
├── types.ts                 # TypeScript type definitions and enums
├── index.html               # Main HTML entry point
└── index.tsx                # React application entry point

````

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation & Running

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sharbmee/Issue-tracker
   cd react-issue-tracker
````

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

The application should now be running on `http://localhost:3000/` (or another port if 5173 is in use).

## 💡 How It Works

### Data Management

The application uses a mock service located at `src/services/issueService.ts`. This service simulates an API by returning hardcoded data with an artificial delay. This allows the frontend to be developed and tested independently of a backend, showcasing loading states, error handling, and asynchronous operations.

### State Management

Application state is managed using React's built-in hooks:

* `useState` is used for managing local component state (e.g., form inputs, modal visibility).
* `useEffect` and `useCallback` are used to handle side effects, such as fetching data when filters or pagination change, while optimizing performance.
* `useContext` (via `ThemeContext`) provides a global state for the theme (dark/light mode) to all components without prop drilling.

### Styling

The UI is built entirely with **Tailwind CSS**. Utility classes are used directly in the JSX for rapid and consistent styling. A minimal Tailwind config is included in `index.html` to extend the default theme with primary brand colors and enable dark mode via a `dark` class on the `<html>` element.

```