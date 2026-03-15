import { getProjectById } from '@/lib/data/projects';
import type { ProjectProps } from '@/types/index';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import EditProjectForm from '@/components/project/EditProjectForm';
import { notFound } from 'next/navigation';

// server component
export default async function EditProjectPage({ params }: ProjectProps) {
  const { id } = await params;

  // we get de project
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Editar Proyecto</h1>
          <p className="text-sm text-muted-foreground">
            Actualiza la información de tu proyecto de forma segura.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de edición</CardTitle>
          </CardHeader>

          {/* We pass the typed project object to the client */}
          <EditProjectForm project={project} />
        </Card>
      </div>
    </div>
  );
}
