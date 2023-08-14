import { ReactElement } from 'react';
import styles from './Home.module.css';

export function Home(): ReactElement {
  return (
    <>
      <h1 className={styles.header}>Добро пожаловать!</h1>
      <p className={styles.message}>
        Для доступа ко всем разделам сайта необходимо авторизоваться.
      </p>
    </>
  );
}
