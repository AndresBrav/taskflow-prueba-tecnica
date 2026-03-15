'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { FormState } from '@/types/index';

export async function createTask(
  _prevState: FormState | null,
  formData: FormData
) {
  const idproject = formData.get('id') as string;
  const titletask = formData.get('titletask') as string;
  const prioritytasks = formData.get('prioritytasks') as string;
  const statetask = formData.get('statetask') as string;
  const descriptiontask = formData.get('descriptiontask') as string;

  try {
    // Create a new task in database
    const newTask = await prisma.task.create({
      data: {
        title: titletask,
        description: descriptiontask,
        status: statetask as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
        priority: prioritytasks as 'LOW' | 'MEDIUM' | 'HIGH',
        projectId: idproject,
      },
    });

    console.log('Tarea creada: ', newTask);
    revalidatePath('/'); // dashboard
    revalidatePath('/projects');
    revalidatePath(`/projects/${idproject}`);
    return null; // <-- return null if everything goes okay
    // return newTask;
  } catch (error) {
    console.error('Error al crear la tarea: ', error);
    return { error: 'No se pudo crear la tarea' };
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

    revalidatePath('/'); // dashboard
    revalidatePath('/projects');
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
    revalidatePath('/'); // dashboard
    revalidatePath('/projects');
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

    revalidatePath('/'); // dashboard
    revalidatePath('/projects');
    revalidatePath(`/projects/${idProject}`);
  } catch (error) {
    console.log(error);
    return { error: 'Error al actualizar la tarea' };
  }
  redirect(`/projects/${idProject}`);
  return null;
};
