import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.css';

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ children, ...restProps }, ref) => {
  return (
    <select {...restProps} className={styles.select} ref={ref}>
      {children}
    </select>
  );
});
