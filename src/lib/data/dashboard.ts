import { prisma } from '@/lib/prisma';

export async function getDashboardData() {
  // Execute in parallel
  const [
    totalProjects,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.task.count(),
    prisma.task.count({ where: { status: 'PENDING' } }),
    prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.task.count({ where: { status: 'COMPLETED' } }),
  ]);

  // last 5 tasks creates
  const recentTasks = await prisma.task.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
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

  // top 5 projects with more pending tasks
  const projectsWithCounts = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      _count: {
        select: {
          tasks: {
            where: { status: 'PENDING' },
          },
        },
      },
    },
  });

  const topPendingProjects = projectsWithCounts
    .map((project) => ({
      id: project.id,
      name: project.name,
      color: project.color,
      pendingCount: project._count.tasks,
    }))
    // We sort in descending order by the number of pending tasks
    .sort((a, b) => b.pendingCount - a.pendingCount)
    // We took the top 3
    .slice(0, 3);

  const stats = {
    totalProjects,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };

  return {
    stats,
    recentTasks,
    topPendingProjects,
  };
}
