import { Todo } from 'Todo';
import { Users } from 'Users';
import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Auto } from '../Auto';
import { Home } from '../Home';
import { AppLayout } from './AppLayout';
import { ConfiguredErrorBoundary } from './ConfiguredErrorBoundary';
import { PrivateRoute } from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ConfiguredErrorBoundary>
        <AppLayout />
      </ConfiguredErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'todos',
        element: (
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        ),
      },
      {
        path: 'auto',
        element: <Auto />,
      },
      {
        path: 'user',
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export function AppRoutes(): ReactNode {
  return <RouterProvider router={router} />;
}
