import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ type, className, ...restProps }, ref) => {
  return (
    <input
      {...restProps}
      type={type}
      className={clsx(
        {
          [styles['input-text']]:
            type === 'text' ||
            type === 'date' ||
            type === 'password' ||
            type === 'email' ||
            type === 'tel',
          [styles['input-checkbox']]: type === 'checkbox',
          [styles['input-radio']]: type === 'radio',
        },
        className,
      )}
      ref={ref}
    />
  );
});
