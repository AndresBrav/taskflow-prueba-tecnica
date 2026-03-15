'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { updateProject } from '@/actions/project-actions';
import { SubmitEditButton } from '@/components/project/SubmitProjectButtons';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { FormState } from '@/types/index';
import type { EditProjectFormProps } from '@/types/index';

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const [state, formAction] = useActionState<FormState | null, FormData>(
    updateProject,
    null
  );

  return (
    <CardContent>
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="p-3 text-sm font-medium bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
            {state.error}
          </div>
        )}

        {/* Input oculto para el ID */}
        <input type="hidden" name="id" value={project.id} />

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={project.name}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
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
            defaultValue={project.description || ''}
            className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="text-sm font-medium">
            Color
          </label>
          <input
            id="color"
            name="color"
            type="color"
            defaultValue={project.color}
            className="h-12 w-20 rounded-md border p-1 cursor-pointer"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitEditButton />
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}`}>Cancelar</Link>
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
