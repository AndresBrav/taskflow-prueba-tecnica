import { Prisma } from "@/generated/prisma/browser";
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

export type ProjectsTasksListProps = {
    project: ProjectWithTasks;
};

export interface RecentTask {
    id: string;
    title: string;
    description: string | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    createdAt: Date;
    project: {
        id: string;
        name: string;
        color: string;
    };
}
export interface TopPendingProjectsProps {
    projects: TopPendingProject[];
}

// contiene el id que se va a pasar a la página de edición del proyecto
export type ProjectProps = {
    params: Promise<{
        id: string;
    }>;
};

// obtenemos el número de tareas por estado para mostrarlo en el proyecto
export type ProjectWithTasks = Prisma.ProjectGetPayload<{
    include: { tasks: true };
}>;

