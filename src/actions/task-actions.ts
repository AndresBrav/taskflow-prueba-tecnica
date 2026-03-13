'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
  const idproject = formData.get('id') as string;
  const titletask = formData.get('titletask') as string;
  const prioritytasks = formData.get('prioritytasks') as string;
  const descriptiontask = formData.get('descriptiontask') as string;

  //   console.log(
  //     'the datas are: ',
  //     idproject,
  //     titletask,
  //     prioritytasks,
  //     descriptiontask
  //   );
  try {
    // Crear una nueva tarea en la base de datos
    const newTask = await prisma.task.create({
      data: {
        title: titletask,
        description: descriptiontask,
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
