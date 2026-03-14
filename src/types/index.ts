import { Prisma } from '@/generated/prisma/browser';
export interface RecentTasksListProps {
  tasks: RecentTask[];
}

// interface StatsCardsProps
export interface StatsCardsProps {
  stats: {
    totalProjects: number;
    totalTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    completedTasks: number;
  };
}

export interface TopPendingProject {
  id: string;
  name: string;
  color: string;
  pendingCount: number;
}
export interface TopPendingProjectsProps {
  projects: TopPendingProject[];
}

export type ProjectsTasksListProps = {
  project: ProjectWithTasks;
};

export interface RecentTask {
  id: string;
  title: string;
  description: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
  project: {
    id: string;
    name: string;
    color: string;
  };
}

// contains the ID that will be passed to the project's edit page
export type ProjectProps = {
  params: Promise<{
    id: string;
  }>;
};

// We retrieve the number of tasks by status to display it in the project
export type ProjectWithTasks = Prisma.ProjectGetPayload<{
  include: { tasks: true };
}>;

export interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
}

export interface FormState {
  error?: string;
}
