import { AppRoutes } from 'AppRoutes';
import React, { ReactElement } from 'react';
import { GlobalState } from './GlobalState';
import { QueryProvider } from './QueryProvider';

export function App(): ReactElement {
  return (
    <React.StrictMode>
      <GlobalState>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </GlobalState>
    </React.StrictMode>
  );
}
