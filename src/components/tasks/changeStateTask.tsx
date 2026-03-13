'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateTaskStatus } from '@/actions/task-actions';
import { useRef } from 'react';

interface Props {
  taskId: string;
  currentStatus: string;
  projectId: string;
}

const ChangeStateTask = ({ taskId, currentStatus, projectId }: Props) => {
  // we use the refernce to the form
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={updateTaskStatus}>
      <input type="hidden" name="idTask" value={taskId} />
      <input type="hidden" name="projectId" value={projectId} />

      <Select
        name="changeStateTask"
        defaultValue={currentStatus}
        //  when the value changes we sent the value automaticaly
        onValueChange={() => {
          formRef.current?.requestSubmit();
        }}
      >
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue placeholder="Cambiar estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pendiente</SelectItem>
          <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
          <SelectItem value="COMPLETED">Completada</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
};

export default ChangeStateTask;
