'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
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
    // return newTask;
    revalidatePath(`/projects/${idproject}`);
  } catch (error) {
    console.error('Error al crear la tarea: ', error);
    throw new Error('No se pudo crear la tarea');
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
