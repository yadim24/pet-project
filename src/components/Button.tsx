import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  circle?: boolean;
  color?: 'primary' | 'secondary';
};

export const Button: FC<Props> = ({
  children,
  circle = false,
  color = 'primary',
  className,
  ...restProps
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...restProps}
      className={clsx(
        {
          [styles.button]: !circle,
          [styles['button-circle']]: circle,
          [styles['button-primary']]: color === 'primary',
          [styles['button-secondary']]: color === 'secondary',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
