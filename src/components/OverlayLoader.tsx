import { FC, ReactNode } from 'react';
import styles from './OverlayLoader.module.css';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const OverlayLoader: FC<Props> = ({ isLoading, children }) => {
  return (
    <div className={styles['loader-container']}>
      {isLoading && (
        <div className={styles.loader}>
          <span>Идёт загрузка....</span>
        </div>
      )}
      {children}
    </div>
  );
};
