# IoT Dashboard Project

This is a Next.js based IoT dashboard project, designed to manage and control various IoT projects with a focus on flexibility, extensibility, and real-time data handling.

## Project Overview

This IoT dashboard allows users to create, manage, and interact with different types of IoT projects. It features a dynamic sidebar for project navigation, customizable dashboards for each project type, and real-time data visualization and control capabilities.

### Key Features

- Dynamic project creation and management
- Flexible project type system allowing for easy addition of new IoT device types
- Customizable dashboards for different project types
- Real-time data visualization and control
- Responsive design for both desktop and mobile use
- Integration with Firebase for real-time database and authentication

### Current Implementation

- Project sidebar with project list and creation functionality
- Dynamic project dashboard rendering based on project type
- Flexible project data structure using TypeScript interfaces
- Custom hook (useProjects) for fetching and managing projects
- LED Control project type with On/Off functionality

## Project Structure
my-iot-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── projects/
│   │   │       └── route.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── ProjectDashboard.tsx
│   │   └── dashboards/
│   │       └── LEDControlDashboard.tsx
│   ├── hooks/
│   │   └── useProjects.ts
│   ├── types/
│   │   └── types.ts
│   └── utils/
│       └── firebase.ts
├── public/
├── .next/
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md

## Detailed Component Breakdown

### Sidebar (src/components/Sidebar.tsx)
- Displays list of projects
- Allows creation of new projects
- Handles project selection

### ProjectDashboard (src/components/ProjectDashboard.tsx)
- Dynamically renders appropriate dashboard based on project type
- Uses a mapping of project types to dashboard components

### LEDControlDashboard (src/components/dashboards/LEDControlDashboard.tsx)
- Specific dashboard for LED control projects
- Implements On/Off functionality for LEDs

### useProjects Hook (src/hooks/useProjects.ts)
- Custom hook for fetching and managing projects
- Integrates with Firebase for real-time updates

### API Route (src/app/api/projects/route.ts)
- Handles project creation and management on the server-side

## Data Structure

Projects are structured as follows:

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  data: Record<string, any>; // Flexible data structure for project-specific information
}tionality (in progress)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev