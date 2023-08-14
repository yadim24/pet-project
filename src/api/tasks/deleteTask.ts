type DeleteTask = ({ id }: { id: number }) => Promise<void>;

export const deleteTask: DeleteTask = async ({ id }) => {
  const response = await fetch(`http://localhost:3050/api/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
