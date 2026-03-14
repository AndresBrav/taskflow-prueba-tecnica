'use client'; // <---very important

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus(); // pending is true while the accion is running

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar proyecto'}
    </Button>
  );
}

export function SubmitEditButton() {
  const { pending } = useFormStatus(); // pending is true while the accion is running

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar Cambios'}
    </Button>
  );
}
