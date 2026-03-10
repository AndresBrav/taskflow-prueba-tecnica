import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
    const totalProjects = await prisma.project.count();

    const totalTasks = await prisma.task.count();

    const pendingTasks = await prisma.task.count({
        where: { status: "PENDING" },
    });

    const inProgressTasks = await prisma.task.count({
        where: { status: "IN_PROGRESS" },
    });

    const completedTasks = await prisma.task.count({
        where: { status: "COMPLETED" },
    });

    // ultimas 5 tareas creadas, ordenadas por fecha de creación descendente
    const recentTasks = await prisma.task.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
            project: {
                select: {
                    id: true,
                    name: true,
                    color: true,
                },
            },
        },
    });

    //projects con mas tareas pendientes
    const projects = await prisma.project.findMany({
        include: {
            tasks: {
                select: {
                    id: true,
                    status: true,
                },
            },
        },
    });

    const projectsWithPendingCount = [];

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        let pendingCount = 0;

        for (let j = 0; j < project.tasks.length; j++) {
            if (project.tasks[j].status === "PENDING") {
                pendingCount++;
            }
        }

        projectsWithPendingCount.push({
            id: project.id,
            name: project.name,
            color: project.color,
            pendingCount: pendingCount,
        });
    }

    let topPendingProjects = [];

    for (let i = 0; i < 3; i++) {
        let maxIndex = -1;

        for (let j = 0; j < projectsWithPendingCount.length; j++) {
            if (
                projectsWithPendingCount[j].pendingCount > 0 &&
                (maxIndex === -1 ||
                    projectsWithPendingCount[j].pendingCount >
                        projectsWithPendingCount[maxIndex].pendingCount)
            ) {
                maxIndex = j;
            }
        }

        if (maxIndex !== -1) {
            topPendingProjects.push(projectsWithPendingCount[maxIndex]);
            projectsWithPendingCount[maxIndex].pendingCount = -1;
        }
    }

    const stats = {
        totalProjects: totalProjects,
        totalTasks: totalTasks,
        pendingTasks: pendingTasks,
        inProgressTasks: inProgressTasks,
        completedTasks: completedTasks,
    };

    return {
        stats,
        recentTasks,
        topPendingProjects,
    };
}
