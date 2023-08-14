type Params = {
  id: number;
  newTask: string;
};

type UpdateTask = (params: Params) => Promise<void>;

export const updateTask: UpdateTask = async ({ id, newTask }) => {
  const response = await fetch(`http://localhost:3050/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: newTask }),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
