'use client';
import { SubmitButtonCreateTask } from '@/components/tasks/submit-buttonTask';
import { useActionState } from 'react';
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
import { createTask } from '@/actions/task-actions';
import { ProjectsTasksListProps } from '@/types';

const CreateTaskComponent = ({ project }: ProjectsTasksListProps) => {
  const [state, formAction] = useActionState(createTask, null);
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Nueva tarea</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction}>
          <input type="hidden" name="id" value={project.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <input
                type="text"
                id="titletaks"
                name="titletask"
                placeholder="Ej: Diseñar dashboard principal"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioridad</label>

              <Select name="prioritytasks">
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>

              <Select name="statetask">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem value="PENDING">Pendiente</SelectItem>
                    <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                    <SelectItem value="COMPLETED">Completado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <br />
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <textarea
              id="descriptiontask"
              name="descriptiontask"
              placeholder="Describe brevemente la tarea"
              className="min-h-27.5 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex justify-end">
            {/* <Button type="submit">Agregar tarea</Button> */}
            <SubmitButtonCreateTask />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTaskComponent;
