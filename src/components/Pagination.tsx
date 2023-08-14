import clsx from 'clsx';
import { FC } from 'react';
import { Button } from './Button';
import styles from './Pagination.module.css';

type Props = {
  totalRows: number;
  limitParams: number;
  activePage: number;
  onPageClick: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  totalRows,
  limitParams,
  activePage,
  onPageClick,
}) => {
  const pagesQty = Math.ceil(totalRows / limitParams);
  const pagesBtn = Array.from({ length: pagesQty }).map(
    (_item, index) => index + 1,
  );

  return (
    <div>
      {pagesBtn.map((number) => (
        <Button
          key={`page${number}`}
          circle
          color="secondary"
          className={clsx({ [styles.active]: activePage === number })}
          onClick={() => onPageClick(number)}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};
