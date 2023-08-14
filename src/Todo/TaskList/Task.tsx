import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Pencil, Save, Trash } from 'lucide-react';
import { FC, useState } from 'react';
import styles from './Task.module.css';

type Props = {
  taskItem: {
    id: number;
    task: string;
    isDone: boolean;
  };
  onUpdateTaskIsDone: () => void;
  onUpdateTask: (newTask: string) => void;
  onDeleteTask: () => void;
};

export const Task: FC<Props> = ({
  taskItem,
  onUpdateTaskIsDone,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTask, setNewTask] = useState(taskItem.task);

  return (
    <li className={styles.li}>
      {isEdit ? (
        <>
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={styles['input-task']}
          />
          <Button
            onClick={() => {
              onUpdateTask(newTask);
              setIsEdit(false);
            }}
            circle
          >
            <Save size={16} />
          </Button>
        </>
      ) : (
        <>
          <div className={styles['task-container']}>
            <Input
              type="checkbox"
              onChange={onUpdateTaskIsDone}
              checked={taskItem.isDone}
            />
            <span className={taskItem.isDone ? styles['task-name'] : undefined}>
              {taskItem.task}
            </span>
          </div>
          <div className={styles['buttons-container']}>
            <Button onClick={() => setIsEdit(true)} circle>
              <Pencil size={16} />
            </Button>
            <Button onClick={onDeleteTask} circle>
              <Trash size={16} />
            </Button>
          </div>
        </>
      )}
    </li>
  );
};
