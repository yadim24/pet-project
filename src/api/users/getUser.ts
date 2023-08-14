import { z } from 'zod';

const validateUser = z.object({
  lastName: z.string(),
  firstName: z.string(),
  birthday: z.string(),
  country: z.string(),
  town: z.string(),
  phone: z.string(),
  email: z.string(),
  id: z.number(),
});

type UserResponse = z.infer<typeof validateUser>;

type GetUser = {
  ({ userId }: { userId: number }): Promise<UserResponse>;
  queryKey: string;
};

export const getUser: GetUser = async ({ userId }) => {
  const response = await fetch(`/api/users/${userId.toString()}`);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const validatedUser = validateUser.safeParse(await response.json());

  let responseDataResult: UserResponse;

  if (validatedUser.success) {
    responseDataResult = validatedUser.data;

    return responseDataResult;
  }

  throw new Error('Сервер вернул неверный формат данных');
};

getUser.queryKey = `getUser-${crypto.randomUUID()}`;
