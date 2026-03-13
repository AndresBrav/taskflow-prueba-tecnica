import { Task } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const getTaskByID = async (id: string): Promise<Task> => {
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    notFound();
  }
  return task;
};
