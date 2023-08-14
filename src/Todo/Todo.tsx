import { useQuery } from '@tanstack/react-query';
import { Input } from 'components/Input';
import { ReactElement, useState } from 'react';
import { getTasks } from '../api/tasks/getTasks';
import { OverlayLoader } from '../components/OverlayLoader';
import { AddTask } from './AddTask';
import { TaskList } from './TaskList';
import styles from './Todo.module.css';

type FilterTasks = {
  value: 'all' | 'active' | 'done';
  name: string;
};

const filterTasks: FilterTasks[] = [
  { value: 'all', name: 'Все' },
  { value: 'active', name: 'Активные' },
  { value: 'done', name: 'Выполненные' },
];

export function Todo(): ReactElement {
  const [selectedFilter, setSelectedFilter] = useState<
    'active' | 'done' | 'all'
  >('all');

  const { isFetching, data = [] } = useQuery({
    queryKey: [getTasks.queryKey, { selectedFilter }],
    queryFn: ({ signal }) => getTasks({ selectedFilter, signal }),
  });

  return (
    <>
      <h1 className={styles.header}>Мой список задач</h1>
      <OverlayLoader isLoading={isFetching}>
        <div className={styles['stack-container']}>
          <div>
            <AddTask />
          </div>
          <div>
            <TaskList taskList={data} />
          </div>
          <div className={styles['filter-container']}>
            {filterTasks.map((filter) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label key={filter.value} className={styles['filter-label']}>
                <Input
                  type="radio"
                  value={filter.value}
                  checked={selectedFilter === filter.value}
                  onChange={() => setSelectedFilter(filter.value)}
                />
                {filter.name}
              </label>
            ))}
          </div>
        </div>
      </OverlayLoader>
    </>
  );
}
