'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { taskSchema, type FormState } from '@/lib/zod';

export async function createTask(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  // 1. We validate the data using Zod
  const validatedFields = taskSchema.safeParse({
    title: formData.get('titletask'),
    description: formData.get('descriptiontask'),
    projectId: formData.get('id'),
  });

  // 2. If Zod detects errors, we return them immediately
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error de validación. Revisa los campos.',
    };
  }

  // 3. Validated data, ready to use
  const { title, description, projectId } = validatedFields.data;

  // We extract the ones that are not in the Zod schema (Selects)
  const priority = formData.get('prioritytasks') as 'LOW' | 'MEDIUM' | 'HIGH';
  const status = formData.get('statetask') as
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED';

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        projectId,
      },
    });

    revalidatePath(`/projects/${projectId}`);
    return {
      message: 'Tarea creada con éxito',
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Error de base de datos: No se pudo crear la tarea.',
      errors: {},
    };
  }
}

export const deleteTask = async (formData: FormData) => {
  try {
    const idTask = formData.get('id') as string;
    const idProject = formData.get('idProject') as string;
    // console.log('the id was passed', idTask);

    if (!idTask) return;

    const deleteTask = await prisma.task.delete({
      where: {
        id: idTask,
      },
    });

    revalidatePath(`/projects/${idProject}`); /* clear the cache */
  } catch (error) {
    console.error('Error  al eliminar la tarea: ', error);
    throw new Error('No se pudo eliminar la tarea');
  }
};

export async function updateTaskStatus(formData: FormData) {
  const id = formData.get('idTask') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('changeStateTask') as string;

  // console.log('id es', id, 'status', status);

  try {
    await prisma.task.update({
      where: { id },
      data: {
        status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
      },
    });

    // revalidate the page to see the changes
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Error al actualizar:', error);
  }
}

export const updateTask = async (
  _prevState: FormState | null,
  formData: FormData
) => {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const prioritytasks = formData.get('prioritytasks') as string;
  const idProject = formData.get('idProject') as string;

  try {
    await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
        priority: prioritytasks as 'LOW' | 'MEDIUM' | 'HIGH',
      },
    });

    revalidatePath(`/projects/${idProject}`);
  } catch (error) {
    console.log(error);
    return { error: 'Error al actualizar la tarea' };
  }
  redirect(`/projects/${idProject}`);
  return null;
};
