type CreateTask = ({ newTask }: { newTask: string }) => Promise<void>;

export const createTask: CreateTask = async ({ newTask }) => {
  const response = await fetch('http://localhost:3050/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task: newTask,
      isDone: false,
    }),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
