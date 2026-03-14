// lib/zod.ts
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  projectId: z.string().min(1, 'El ID del proyecto es requerido'),
});

// We define the state structure to avoid using ‘any’
export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
    projectId?: string[];
  };
  message?: string | null;
  success?: boolean;
};
