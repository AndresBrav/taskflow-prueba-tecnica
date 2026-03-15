import { getTaskByID } from '@/lib/data/tasks';
import EditTaskForm from '@/components/tasks/EditTaskForm';
import type { Props } from '@/types/index';

const EditTaskPage = async ({ params }: Props) => {
  const { id, taskId } = await params;

  const task = await getTaskByID(taskId);

  return <EditTaskForm task={task} projectId={id} />;
};

export default EditTaskPage;
