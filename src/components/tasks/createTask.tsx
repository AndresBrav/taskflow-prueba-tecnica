// components/tasks/createTask.tsx
'use client';
import { SubmitButtonCreateTask } from '@/components/tasks/Submit-buttonTask';
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
        {/* Formulario estándar de Next.js */}
        <form action={formAction}>
          <input type="hidden" name="id" value={project.id} />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <input
                type="text"
                name="titletask"
                placeholder="Ej: Diseñar dashboard principal"
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  state?.errors?.title ? 'border-destructive' : 'border-input'
                }`}
              />
              {state?.errors?.title && (
                <p className="text-xs font-medium text-destructive">
                  {state.errors.title[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioridad</label>
              <Select name="prioritytasks" defaultValue="MEDIUM">
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
              <Select name="statetask" defaultValue="PENDING">
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
              name="descriptiontask"
              placeholder="Describe brevemente la tarea"
              className="min-h-[110px] w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          {state?.message && !state.success && (
            <p className="text-sm font-medium text-destructive mt-2">
              {state.message}
            </p>
          )}

          <div className="flex justify-end mt-4">
            <SubmitButtonCreateTask />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTaskComponent;
