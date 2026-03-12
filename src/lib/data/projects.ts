import { prisma } from "@/lib/prisma";
import { Prisma, Project, Task } from "@/generated/prisma/client";
import { notFound } from "next/navigation";

export async function getProjects() {
    const projects = await prisma.project.findMany({
        include: {
            tasks: true,
        },
    });

    return projects;
}

export function countTasks(tasks: Task[]) {
    let pending = 0;
    let progress = 0;
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === "PENDING") {
            pending++;
        }

        if (tasks[i].status === "IN_PROGRESS") {
            progress++;
        }

        if (tasks[i].status === "COMPLETED") {
            completed++;
        }
    }

    return {
        pending,
        progress,
        completed,
    };
}

//obtenemos el proyecto por su id, si no existe se muestra la página de 404
export const getProjectById = async (id: string):Promise<Project> => {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
    });

    if (!project) {
        notFound();
    }
    return project;
};

type ProjectWithTasks = Prisma.ProjectGetPayload<{
    include: { tasks: true };
}>;

export const getProjectWithTasksById = async (
    id: string,
): Promise<ProjectWithTasks> => {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        include: {
            tasks: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!project) {
        notFound();
    }

    return project;
};
