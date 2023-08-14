import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_PARAM } from 'Users/constants';
import { UserPlus } from 'lucide-react';
import { ChangeEventHandler, ReactElement, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { invariant } from 'shared/invariant';
import { coerceValidateInt } from 'shared/zodScheme';
import { deleteUser } from '../api/users/deleteUser';
import { getUsers } from '../api/users/getUsers';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { OverlayLoader } from '../components/OverlayLoader';
import { Pagination } from '../components/Pagination';
import { Select } from '../components/Select';
import { useDebounce } from '../shared/useDebounce';
import { AddUser } from './AddUser';
import { Table } from './Table';
import styles from './Users.module.css';

export function Users(): ReactElement {
  const userDialogRef = useRef<HTMLDialogElement>(null);

  const [userId, setUserId] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const userFilter = searchParams.get(QUERY_PARAM.FILTER) ?? '';
  const rowPage = searchParams.get(QUERY_PARAM.PAGE) ?? '1';
  const validatePage = coerceValidateInt.safeParse(rowPage);

  invariant(validatePage.success, 'SearchParams page не явялется числом');

  const page = validatePage.data;

  const rowLimit = searchParams.get(QUERY_PARAM.LIMIT) ?? '5';
  const validateLimit = coerceValidateInt.safeParse(rowLimit);

  invariant(validateLimit.success, 'SearchParams limit не является числом');

  const limit = validateLimit.data;

  const debounceFilter = useDebounce(userFilter, 500);
  const queryClient = useQueryClient();

  const { isFetching, data = { result: [], totalRows: 1 } } = useQuery({
    queryKey: [
      getUsers.queryKey,
      {
        page,
        limit,
        filter: debounceFilter,
      },
    ],
    queryFn: () =>
      getUsers({
        page: page.toString(),
        limit: limit.toString(),
        filter: debounceFilter,
      }),
  });

  const handleEdit = (id: number): void => {
    setUserId(id);
    userDialogRef.current?.showModal();
  };

  const mutationDeleteUser = useMutation<unknown, unknown, { id: number }>({
    mutationFn: ({ id }) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getUsers.queryKey],
      });
      const pagesQty = Math.ceil((data.totalRows - 1) / limit);

      if (page > pagesQty) {
        setSearchParams((prevSearchParams) => {
          prevSearchParams.set(QUERY_PARAM.PAGE, pagesQty.toString());

          return prevSearchParams;
        });
      }
    },
  });

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    const filter = e.target.value;

    if (page !== 1) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(QUERY_PARAM.PAGE, '1');

        return prevSearchParams;
      });
    }

    setSearchParams((prevSearchParams) => {
      prevSearchParams.set(QUERY_PARAM.FILTER, filter);

      return prevSearchParams;
    });
  };

  return (
    <OverlayLoader isLoading={isFetching}>
      <div className={styles.user}>
        <h2 id="tab">Список пользователей</h2>
        <div className={styles.search}>
          <Button
            onClick={() => userDialogRef.current?.showModal()}
            circle
            title="Добавить пользователя"
          >
            <UserPlus size={16} />
          </Button>
          <Input
            type="search"
            placeholder="Поиск..."
            value={userFilter}
            onChange={handleFilter}
          />
        </div>
        <Table
          usersList={data.result}
          onEdit={handleEdit}
          onDelete={(id) => {
            mutationDeleteUser.mutate({ id });
          }}
        />
        <AddUser
          ref={userDialogRef}
          userId={userId}
          onChangeUserId={() => setUserId(0)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Отображать по:
          <Select
            id="limit"
            name="limit"
            value={limit}
            onChange={(e) => {
              if (page !== 1) {
                setSearchParams((prevSearchParams) => {
                  prevSearchParams.set(QUERY_PARAM.PAGE, '1');

                  return prevSearchParams;
                });
              }

              setSearchParams((prevSearchParams) => {
                prevSearchParams.set(QUERY_PARAM.LIMIT, e.target.value);

                return prevSearchParams;
              });
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Select>
        </label>
        <Pagination
          totalRows={data.totalRows}
          limitParams={limit}
          activePage={page}
          onPageClick={(number) =>
            setSearchParams((prevSearchParams) => {
              prevSearchParams.set(QUERY_PARAM.PAGE, number.toString());

              return prevSearchParams;
            })
          }
        />
      </div>
    </OverlayLoader>
  );
}
