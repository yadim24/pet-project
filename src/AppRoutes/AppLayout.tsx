import { Login } from 'Login/Login';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { ReactNode, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Outlet } from 'react-router-dom';
import { GlobalStateContext } from 'shared/GlobalStateContext';
import { invariant } from 'shared/invariant';
import styles from './AppLayout.module.css';

const links = [
  {
    id: crypto.randomUUID(),
    to: '/',
    label: 'Home',
    isPrivate: false,
  },
  {
    id: crypto.randomUUID(),
    to: 'todos',
    label: 'Todos',
    isPrivate: true,
  },
  {
    id: crypto.randomUUID(),
    to: 'auto',
    label: 'Auto choise',
    isPrivate: false,
  },
  {
    id: crypto.randomUUID(),
    to: 'user',
    label: 'Add user',
    isPrivate: true,
  },
];

export function AppLayout(): ReactNode {
  const contextValue = useContext(GlobalStateContext);

  invariant(contextValue != null, 'Не подключен провайдер!');

  const [{ isLogin }, dispatch] = contextValue;

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {links
            .filter((link) => isLogin || !link.isPrivate)
            .map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  clsx(styles['nav-item'], {
                    [styles['nav-item-active']]: isActive,
                  })
                }
              >
                {link.label}
              </NavLink>
            ))}
        </nav>
        <Button
          className={styles.login}
          onClick={() => {
            if (!isLogin) {
              setShowLogin(true);

              return;
            }

            dispatch({
              type: 'logout',
            });
          }}
        >
          {isLogin ? 'LogOut' : 'Login'}
        </Button>
        {showLogin &&
          createPortal(
            <Login onClose={() => setShowLogin(false)} />,
            document.body,
          )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
