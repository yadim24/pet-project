import type { CreateUserRequest } from './createUser';

type Params = {
  userId: number;
  newUser: CreateUserRequest;
};

type UpdateUser = (params: Params) => Promise<void>;

export const updateUser: UpdateUser = async ({ userId, newUser }) => {
  const response = await fetch(`http://localhost:3050/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
