'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { error } from 'console';

export interface FormState {
  error?: string;
}

export async function createProject(
  _prevState: FormState | null,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const color = formData.get('color') as string;

  if (!name || name.trim() === '') {
    return { error: 'El nombre es obligatorio' };
  }

  try {
    await prisma.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color || '#6366f1',
      },
    });
  } catch (e) {
    return { error: 'Error al conectar con la base de datos' };
  }

  revalidatePath('/projects'); //reload the page
  redirect('/projects'); //redirect to the page
}

export async function updateProject(
  _prevState: FormState | null,
  formData: FormData
) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const color = formData.get('color') as string;

  if (!id) {
    return { error: 'El id del proyecto es obligatorio' };
  }

  if (!name || name.trim() === '') {
    return { error: 'El nombre es obligatorio' };
  }

  await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      color: color || '#6366f1',
    },
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${id}`);
  revalidatePath(`/projects/${id}/edit`);

  redirect(`/projects/${id}`);
}

export const deleteProject = async (formData: FormData) => {
  const id = formData.get('id') as string;

  if (!id) {
    throw new Error('El id del proyecto es obligatorio');
  }

  await prisma.project.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/projects');
  redirect('/projects');
};
