// app/projects/[id]/page.tsx
import TaskFilters from '@/components/tasks/TaskFilters';
import CreateTaskComponent from '@/components/tasks/createTask';
import ProjectsTasksList from '@/components/project/projects-tasks';
import { getProjectWithTasksById } from '@/lib/data/projects';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteProject } from '@/actions/project-actions';

// We define the interface for the page's props
interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; priority?: string }>;
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const filters = await searchParams; // We get the filters from url

  // The magic: Prisma now brings us filtered tasks
  const project = await getProjectWithTasksById(id, filters);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="h-5 w-5 rounded-full border"
                style={{ backgroundColor: project.color }}
              />

              <h1 className="text-3xl font-bold">{project.name}</h1>
            </div>

            <p className="max-w-3xl text-sm text-muted-foreground">
              {project.description || 'Este proyecto no tiene descripción.'}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Fecha de creación:
                </span>{' '}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>

              <p>
                <span className="font-medium text-foreground">Color:</span>{' '}
                {project.color}
              </p>

              <p>
                <span className="font-medium text-foreground">
                  Total tareas:
                </span>{' '}
                {project.tasks.length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/projects">Volver</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href={`/projects/${project.id}/edit`}>Editar proyecto</Link>
            </Button>

            <AlertDialog>
              {/* the Trigger  is the button*/}
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Eliminar proyecto</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás absolutamente seguro?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer. Se eliminará
                    permanentemente el proyecto
                    <strong> "{project.name}"</strong> y todas las tareas
                    asociadas.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                  <AlertDialogCancel className="w-full sm:w-auto mt-0">
                    Cancelar
                  </AlertDialogCancel>

                  <form action={deleteProject} className="w-full sm:w-auto">
                    <input type="hidden" name="id" value={project.id} />
                    <AlertDialogAction
                      type="submit"
                      className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Eliminar definitivamente
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <CreateTaskComponent project={project} />

          {/* Our new filter component */}
          <TaskFilters />
        </section>

        {/* Task List (Already filtered in project.tasks) */}
        <ProjectsTasksList project={project} />
      </div>
    </div>
  );
}
