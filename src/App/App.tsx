import { AppRoutes } from 'AppRoutes';
import { ReactElement } from 'react';
import { GlobalState } from './GlobalState';
import { QueryProvider } from './QueryProvider';

export function App(): ReactElement {
  return (
    <GlobalState>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
    </GlobalState>
  );
}
