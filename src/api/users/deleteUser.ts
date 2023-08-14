type DeleteUser = (id: number) => Promise<void>;

export const deleteUser: DeleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
