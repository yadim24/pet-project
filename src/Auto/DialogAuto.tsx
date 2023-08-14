import { forwardRef } from 'react';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import styles from './DialogAuto.module.css';

const optionList = [
  'Lixiang Li9',
  'Lynk&Co 09',
  'Geely Monjaro',
  'Voyah Free',
  'Li One',
];

type Props = {
  handleChange: () => void;
  onSelectAuto: (value: string) => void;
};

export const DialogAuto = forwardRef<HTMLDialogElement, Props>(
  function DialogAuto({ handleChange, onSelectAuto }, ref) {
    return (
      <dialog className={styles.dialog} ref={ref}>
        <form>
          <p>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              Любимая машина:
              <Select onChange={(e) => onSelectAuto(e.target.value)}>
                <option>--Выберете марку--</option>
                {optionList.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Select>
            </label>
          </p>
          <div>
            <Button
              onClick={() => {
                if (ref && 'current' in ref) ref.current?.close();
              }}
            >
              Отмена
            </Button>
            <Button type="button" onClick={handleChange}>
              Подтвердить
            </Button>
          </div>
        </form>
      </dialog>
    );
  },
);
