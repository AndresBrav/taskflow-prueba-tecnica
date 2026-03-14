'use client'; // <---very important

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SubmitButtonCreateTask() {
  const { pending } = useFormStatus(); // pending is true while the accion is running

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Agregar tarea'}
    </Button>
  );
}

export const SubmitButtonEditTask = () => {
  const { pending } = useFormStatus(); // pending is true while the accion is running

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar cambios'}
    </Button>
  );
};
