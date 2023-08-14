type UpdateTaskIsDone = ({
  isDone,
  id,
}: {
  isDone: boolean;
  id: number;
}) => Promise<void>;

export const updateTaskIsDone: UpdateTaskIsDone = async ({ isDone, id }) => {
  const checkedTask = !isDone;

  const response = await fetch(`http://localhost:3050/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDone: checkedTask }),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
