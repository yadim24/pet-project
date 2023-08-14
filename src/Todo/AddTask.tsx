import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { createTask } from '../api/tasks/createTask';
import { getTasks } from '../api/tasks/getTasks';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import styles from './AddTask.module.css';

export function AddTask(): ReactElement {
  const [newTask, setNewTask] = useState('');
  const queryClient = useQueryClient();

  const mutationNewTask = useMutation({
    mutationFn: () => createTask({ newTask }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasks.queryKey],
      });
      setNewTask('');
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        mutationNewTask.mutate();
      }}
    >
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className={styles['create-task']}
        placeholder="Введите задачу..."
        required
      />
      <Button type="submit" circle>
        <Save size={16} />
      </Button>
    </form>
  );
}
