'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createProject } from '@/actions/project-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/project/submit-button';

const NewProjectPage = () => {
  // state: will receive whatever the action returns (errors, etc.)
  // formAction: is the function that will submit the form
  const [state, formAction] = useActionState(createProject, null);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nuevo Proyecto</h1>
            <p className="text-sm text-muted-foreground">
              Crea un nuevo proyecto para comenzar a organizar tus tareas.
            </p>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de proyecto</CardTitle>
          </CardHeader>

          <CardContent>
            {/* We use formAction so that useActionState can track it */}
            <form action={formAction} className="space-y-4">
              {/* ERROR HANDLING */}
              {state?.error && (
                <div className="p-3 text-sm font-medium bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                  {state.error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ej: Sistema de inventario"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
                  placeholder="Describe brevemente el proyecto"
                  className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
                  defaultValue="#6366f1"
                  className="h-12 w-20 rounded-md border p-1 cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-2">
                {/* LOAD STATUS MANAGEMENT (Separate component) */}
                <SubmitButton />

                <Button variant="outline" asChild>
                  <Link href="/projects">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewProjectPage;
