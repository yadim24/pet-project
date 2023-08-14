import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode, useContext, useRef } from 'react';
import { GlobalStateContext } from 'shared/GlobalStateContext';
import { invariant } from 'shared/invariant';
import { z } from 'zod';

type QueryProviderType = {
  children: ReactNode;
};

const validateError = z.object({
  message: z.string(),
});

export const QueryProvider: FC<QueryProviderType> = ({ children }) => {
  const contextValue = useContext(GlobalStateContext);

  invariant(contextValue != null, 'Не подключен провайдер!');

  const [, dispatch] = contextValue;

  const queryClientRef = useRef(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          const result = validateError.safeParse(error);

          if (result.success) {
            dispatch({
              type: 'catchError',
              error: result.data.message,
            });
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          const result = validateError.safeParse(error);

          if (result.success) {
            dispatch({
              type: 'catchError',
              error: result.data.message,
            });
          }
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
