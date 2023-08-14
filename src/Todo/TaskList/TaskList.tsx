import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from 'api/tasks/deleteTask';
import { getTasks } from 'api/tasks/getTasks';
import { updateTask } from 'api/tasks/updateTask';
import { updateTaskIsDone } from 'api/tasks/updateTaskIsDone';
import { ReactElement } from 'react';
import { Task } from './Task';
import styles from './TaskList.module.css';

type TaskType = {
  id: number;
  task: string;
  isDone: boolean;
};

export function TaskList({ taskList }: { taskList: TaskType[] }): ReactElement {
  const queryClient = useQueryClient();

  const mutationUpdateTaskIsDone = useMutation<
    unknown,
    unknown,
    { isDone: boolean; id: number }
  >({
    mutationFn: ({ isDone, id }) => updateTaskIsDone({ isDone, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasks.queryKey],
      });
    },
  });

  const mutationUpdateTask = useMutation<
    unknown,
    unknown,
    { id: number; newTask: string }
  >({
    mutationFn: ({ id, newTask }) => updateTask({ id, newTask }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasks.queryKey],
      });
    },
  });

  const mutationDeleteTask = useMutation<unknown, unknown, { id: number }>({
    mutationFn: ({ id }) => deleteTask({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasks.queryKey],
      });
    },
  });

  return (
    <ul className={styles['task-list']}>
      {taskList.map((taskItem) => (
        <Task
          key={taskItem.id}
          onUpdateTaskIsDone={() =>
            mutationUpdateTaskIsDone.mutate({
              isDone: taskItem.isDone,
              id: taskItem.id,
            })
          }
          onUpdateTask={(newTask) =>
            mutationUpdateTask.mutate({ id: taskItem.id, newTask })
          }
          onDeleteTask={() => mutationDeleteTask.mutate({ id: taskItem.id })}
          taskItem={taskItem}
        />
      ))}
    </ul>
  );
}
