import { type UsersResponse } from 'api/users/getUsers';
import clsx from 'clsx';
import { Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../components/Button';
import styles from './Table.module.css';

type Params = {
  usersList: UsersResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const Table: FC<Params> = ({ usersList, onEdit, onDelete }) => {
  const createTable = usersList.map((user) => {
    return (
      <tr key={user.id} className={styles.row}>
        <td className={styles.cell}>{user.lastName}</td>
        <td className={styles.cell}>{user.firstName}</td>
        <td className={clsx(styles.center, styles.cell)}>{user.birthday}</td>
        <td className={clsx(styles.center, styles.cell)}>{user.country}</td>
        <td className={clsx(styles.center, styles.cell)}>{user.town}</td>
        <td className={clsx(styles.center, styles.cell)}>{user.phone}</td>
        <td className={styles.cell}>{user.email}</td>
        <td className={styles.cell}>
          <div className={styles['button-container']}>
            <Button
              onClick={() => onEdit(user.id)}
              circle
              color="secondary"
              title="Редактировать"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={() => onDelete(user.id)}
              circle
              color="secondary"
              title="Удалить"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table className={styles.table} aria-labelledby="tab">
      <thead>
        <tr className={styles.head}>
          <th className={styles.cell}>Фамилия</th>
          <th className={styles.cell}>Имя</th>
          <th className={styles.cell}>Дата рождения</th>
          <th className={styles.cell}>Страна</th>
          <th className={styles.cell}>Город</th>
          <th className={styles.cell}>Телефон</th>
          <th className={styles.cell}>Эл. почта</th>
          <th className={styles.cell}>&nbsp;</th>
        </tr>
      </thead>
      <tbody>{createTable}</tbody>
    </table>
  );
};
