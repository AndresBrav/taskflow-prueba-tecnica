import { prisma } from "@/lib/prisma";
import { Task } from "@/generated/prisma/client";

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
