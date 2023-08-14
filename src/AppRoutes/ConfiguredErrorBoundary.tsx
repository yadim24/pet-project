import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styles from './ConfiguredErrorBoundary.module.css';

const fallback = ({ error }: { error: Error }): ReactNode => {
  return (
    <div className={styles['alert-wrapper']}>
      <div className={styles.alert}>
        <p>Попробуйте перезагрузить страницу, произошла ошибка:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    </div>
  );
};

type ConfiguredErrorBoundaryType = {
  children: ReactNode;
};

export const ConfiguredErrorBoundary: FC<ConfiguredErrorBoundaryType> = ({
  children,
}) => <ErrorBoundary fallbackRender={fallback}>{children}</ErrorBoundary>;
