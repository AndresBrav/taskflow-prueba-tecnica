import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTaskByID } from '@/lib/data/tasks';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateTask } from '@/actions/task-actions';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string; // id project
    taskId: string; // ID task
  }>;
}

const EditTaskPage = async ({ params }: Props) => {
  const { id, taskId } = await params;

  const task = await getTaskByID(taskId);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Editar Tarea</h1>
          <p className="text-sm text-muted-foreground">
            Actualiza la información de la tarea.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de edición</CardTitle>
          </CardHeader>

          <CardContent>
            <form action={updateTask} className="space-y-4">
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="idProject" value={id} />

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Titulo
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={task.title}
                  placeholder="Ej: Sistema de inventario"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={task.description || ''}
                  placeholder="Describe brevemente el proyecto"
                  className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>

                <Select name="status" defaultValue={task.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estados</SelectLabel>
                      <SelectItem value="PENDING">Pendiente</SelectItem>
                      <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                      <SelectItem value="COMPLETED">Completada</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridad</label>

                <Select name="prioritytasks" defaultValue={task.priority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Prioridad</SelectLabel>
                      <SelectItem value="HIGH">Alta</SelectItem>
                      <SelectItem value="MEDIUM">Media</SelectItem>
                      <SelectItem value="LOW">Baja</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit">Guardar cambios</Button>

                <Button variant="outline" asChild>
                  <Link href={`/projects/${id}`}>Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditTaskPage;
