import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { updateProject } from '@/actions/project-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjectById } from '@/lib/data/projects';
import type { ProjectProps } from '@/types/index'; //types of component

const EditProjectPage = async ({ params }: ProjectProps) => {
  const { id } = await params;

  const project = await getProjectById(id); // we get tje project by id

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Editar Proyecto</h1>
          <p className="text-sm text-muted-foreground">
            Actualiza la información de tu proyecto.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de edición</CardTitle>
          </CardHeader>

          <CardContent>
            <form action={updateProject} className="space-y-4">
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
                  defaultValue={project.description || ''}
                  placeholder="Describe brevemente el proyecto"
                  className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
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
                  className="h-12 w-20 rounded-md border p-1"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit">Guardar cambios</Button>

                <Button variant="outline" asChild>
                  <Link href={`/projects/${project.id}`}>Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProjectPage;
