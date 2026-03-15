export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentTasksList from '@/components/dashboard/RecentTasksList';
import TopPendingProjects from '@/components/dashboard/TopPendingProjects';
import { getDashboardData } from '@/lib/data/dashboard';

export default async function DashboardPage() {
  const { stats, recentTasks, topPendingProjects } = await getDashboardData();

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm">
              Resumen general de proyectos y tareas de TaskFlow
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button>
              <Link href="/projects/new">Nuevo proyecto</Link>
            </Button>

            <Button variant="outline">
              <Link href="/projects">Ver proyectos</Link>
            </Button>
          </div>
        </section>

        <StatsCards stats={stats} />

        <section className="grid gap-6 lg:grid-cols-2">
          <RecentTasksList tasks={recentTasks} />
          <TopPendingProjects projects={topPendingProjects} />
        </section>
      </div>
    </div>
  );
}
