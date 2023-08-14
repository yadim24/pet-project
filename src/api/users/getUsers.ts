import { coerceValidateInt } from 'shared/zodScheme';
import { z } from 'zod';

const validateUsers = z.array(
  z.object({
    lastName: z.string(),
    firstName: z.string(),
    birthday: z.string().nullable(),
    country: z.string().nullable(),
    town: z.string().nullable(),
    phone: z.string(),
    email: z.string(),
    id: z.number(),
  }),
);

export type UsersResponse = z.infer<typeof validateUsers>;

type Params = {
  page: string;
  limit: string;
  filter: string;
};

type GetUsers = {
  (params: Params): Promise<{
    result: UsersResponse;
    totalRows: number;
  }>;
  queryKey: string;
};

export const getUsers: GetUsers = async ({ page, limit, filter }) => {
  const query = new URLSearchParams({
    _page: page,
    _limit: limit,
    ...(filter && { q: filter }),
  });

  const response = await fetch(`/api/users?${query.toString()}`);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const validatedUsers = validateUsers.safeParse(await response.json());
  const validatedTotalRows = coerceValidateInt.safeParse(
    response.headers.get('X-Total-Count'),
  );

  let responseDataResult: UsersResponse = [];

  if (validatedUsers.success) {
    responseDataResult = validatedUsers.data;
  } else {
    // eslint-disable-next-line no-console
    console.log(validatedUsers.error);
  }

  if (validatedTotalRows.success)
    return { result: responseDataResult, totalRows: validatedTotalRows.data };

  // eslint-disable-next-line no-console
  console.log(validatedTotalRows.error);
  throw new Error('Сервер вернул неверный формат данных');
};

getUsers.queryKey = `users-${crypto.randomUUID()}`;
