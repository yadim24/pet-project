/* eslint-disable jsx-a11y/label-has-associated-control */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from 'api/users/getUser';
import { getUsers } from 'api/users/getUsers';
import { forwardRef, useEffect, useId } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUser, type CreateUserRequest } from '../api/users/createUser';
import { updateUser } from '../api/users/updateUser';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import styles from './AddUser.module.css';

const location = [
  {
    country: 'Россия',
    towns: [
      'Москва',
      'Санкт-Петербург',
      'Белгород',
      'Краснодар',
      'Новосибирск',
    ],
  },
  {
    country: 'Беларусь',
    towns: ['Минск', 'Брест', 'Бобруйск', 'Могилёв'],
  },
  {
    country: 'Казахстан',
    towns: ['Алматы', 'Астана', 'Костанай', 'Караганда'],
  },
];

const phoneRegExp =
  /^((8|\+375|\+7)[ -]?)?\(?\d{3,5}\)?(?:[ -]?\d){5}(([ -]?\d)?[ -]?\d)?$/;

const schema = z.object({
  lastName: z.string().min(2, { message: 'Имя слишком короткое' }),
  firstName: z.string().min(2, { message: 'Имя слишком короткое' }),
  birthday: z.string(),
  country: z.string(),
  town: z.string(),
  phone: z.string().regex(phoneRegExp, 'Неверный формат'),
  email: z.string().email({ message: 'Неверный формат' }),
});

type AddUserFormValues = z.infer<typeof schema>;

const defaultValues: DefaultValues<AddUserFormValues> = {
  lastName: '',
  firstName: '',
  birthday: '',
  country: '',
  town: '',
  phone: '',
  email: '',
};

type Props = {
  userId: number;
  onChangeUserId: () => void;
};

export const AddUser = forwardRef<HTMLDialogElement, Props>(function AddUser(
  { userId, onChangeUserId },
  ref,
) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const { data } = useQuery({
    queryKey: [getUser.queryKey, { userId }],
    queryFn: () => getUser({ userId }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.id) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday ?? '',
        country: data.country ?? '',
        town: data.town ?? '',
        email: data.email,
        phone: data.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const id = useId();

  const closeDialog = (): void => {
    if (ref && 'current' in ref) ref.current?.close();
  };

  const mutationUser = useMutation<unknown, unknown, CreateUserRequest>({
    mutationFn: (newUser) => {
      if (userId) {
        return updateUser({ userId, newUser });
      }

      return createUser({ newUser });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getUsers.queryKey],
      });
      reset(defaultValues);
      onChangeUserId();
      closeDialog();
    },
  });

  const onSubmit: SubmitHandler<AddUserFormValues> = (formValues) => {
    mutationUser.mutate(formValues);
  };

  const countryValue = watch('country');

  return (
    <dialog ref={ref} className={styles.dialog}>
      <h1 className={styles.header}>Создание пользователя</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['data-container']}>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-lastname`}>Фамилия</label>
            <Input
              type="text"
              id={`${id}-lastname`}
              {...register('lastName')}
              size={10}
              placeholder="Введите фамилию..."
            />
            {errors.lastName && (
              <span className={styles['error-message']}>
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-firstname`}>Имя</label>
            <Input
              type="text"
              id={`${id}-firstname`}
              {...register('firstName')}
              size={10}
              placeholder="Введите имя..."
            />
            {errors.firstName && (
              <span className={styles['error-message']}>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-birthday`}>Дата рождения</label>
            <Input
              type="date"
              id={`${id}-birthday`}
              {...register('birthday')}
            />
          </div>
          {errors.birthday && (
            <span className={styles['error-message']}>
              {errors.birthday.message}
            </span>
          )}
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-country`}>Страна</label>
            <Select id={`${id}-country`} {...register('country')}>
              <option value=""> </option>
              {location.map((item) => {
                return (
                  <option key={item.country} value={item.country}>
                    {item.country}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-town`}>Город</label>
            <Select id={`${id}-town`} {...register('town')}>
              <option value=""> </option>
              {countryValue &&
                location
                  .find((item) => item.country === countryValue)
                  ?.towns.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
            </Select>
          </div>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-phone`}>Телефон</label>
            <Input
              id={`${id}-phone`}
              type="tel"
              {...register('phone')}
              size={10}
              placeholder="+71234567890"
            />
            {errors.phone && (
              <span className={styles['error-message']}>
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className={styles['input-field']}>
            <label htmlFor={`${id}-email`}>Email</label>
            <Input
              id={`${id}-email`}
              type="email"
              {...register('email')}
              size={10}
              placeholder="Введите Email..."
            />
            {errors.email && (
              <span className={styles['error-message']}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => {
              reset(defaultValues);
              closeDialog();
            }}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={!isValid}>
            Сохранить
          </Button>
        </div>
      </form>
    </dialog>
  );
});
