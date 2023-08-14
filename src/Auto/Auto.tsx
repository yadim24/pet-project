import { Button } from 'components/Button';
import { ReactElement, useRef, useState } from 'react';
import styles from './Auto.module.css';
import { DialogAuto } from './DialogAuto';

export function Auto(): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (): void => {
    setResult(selectedValue);
    dialogRef.current?.close();
  };

  const handleSelectAuto = (value: string): void => {
    setSelectedValue(value);
  };

  return (
    <div className={styles.dialog}>
      <Button onClick={() => dialogRef.current?.showModal()}>
        Выбери любимую марку авто!
      </Button>
      <DialogAuto
        ref={dialogRef}
        onSelectAuto={handleSelectAuto}
        handleChange={handleChange}
      />
      <p>Вы выбрали: {result}</p>
    </div>
  );
}
