import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deleteProject } from '@/actions/project-actions';
import type { ProjectProps } from '@/types/index'; //types
import { getProjectWithTasksById } from '@/lib/data/projects';
import ProjectsTasksList from '@/components/project/projects-tasks';
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
import CreateTaskComponent from '@/components/tasks/createTask';

const ProjectDetailPage = async ({ params }: ProjectProps) => {
  const { id } = await params;
  // we get the project with his tasks
  const project = await getProjectWithTasksById(id);

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
          {/* we import the component to create tasks*/}
          <CreateTaskComponent project={project} />
          <Card>
            <CardHeader>
              <CardTitle>Filtros de las tareas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estados</SelectLabel>
                      <SelectItem value="ALL">Todos</SelectItem>
                      <SelectItem value="PENDING">Pendiente</SelectItem>
                      <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                      <SelectItem value="COMPLETED">Completada</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridad</label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas las prioridades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Prioridades</SelectLabel>
                      <SelectItem value="ALL">Todas</SelectItem>
                      <SelectItem value="HIGH">Alta</SelectItem>
                      <SelectItem value="MEDIUM">Media</SelectItem>
                      <SelectItem value="LOW">Baja</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button variant="secondary">Filtrar Tareas</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* lista de tareas de los proyectos */}
        <ProjectsTasksList project={project} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
