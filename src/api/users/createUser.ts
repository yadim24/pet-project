export type CreateUserRequest = {
  lastName: string;
  firstName: string;
  birthday: string | null;
  country: string | null;
  town: string | null;
  phone: string;
  email: string;
};

type CreateUser = ({
  newUser,
}: {
  newUser: CreateUserRequest;
}) => Promise<void>;

export const createUser: CreateUser = async ({ newUser }) => {
  const response = await fetch('http://localhost:3050/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
