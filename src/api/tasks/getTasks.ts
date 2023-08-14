import { z } from 'zod';

type Params = {
  signal?: AbortSignal;
  selectedFilter: 'active' | 'done' | 'all';
};

const validateTasks = z.array(
  z.object({
    id: z.number(),
    task: z.string(),
    isDone: z.boolean(),
  }),
);

type ValidateTasks = z.infer<typeof validateTasks>;

type GetTasks = {
  (params: Params): Promise<ValidateTasks>;
  queryKey: string;
};

export const getTasks: GetTasks = async ({ signal, selectedFilter }) => {
  const queryParams = new URLSearchParams();

  if (selectedFilter === 'active') queryParams.append('isDone', 'false');

  if (selectedFilter === 'done') queryParams.append('isDone', 'true');

  const response = await fetch(
    `http://localhost:3050/api/todos?${queryParams}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const result = validateTasks.safeParse(await response.json());

  if (result.success) return result.data;
  // eslint-disable-next-line no-console
  console.log(result.error);
  throw new Error('Сервер вернул неверный формат данных');
};

getTasks.queryKey = `todos-${crypto.randomUUID()}`;
