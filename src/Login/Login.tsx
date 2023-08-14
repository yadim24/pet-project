import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ReactElement, useContext, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GlobalStateContext } from 'shared/GlobalStateContext';
import { invariant } from 'shared/invariant';
import { z } from 'zod';
import styles from './Login.module.css';

type LoginDataType = {
  login: string;
  password: string;
};

const loginRegExp = /^[A-Za-z][\w.-]{1,20}$/;
const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

const validateLogin = z.object({
  login: z.string().regex(loginRegExp, 'Неверный формат'),
  password: z.string().regex(passRegExp, 'Неверный формат'),
});

export function Login({ onClose }: { onClose: () => void }): ReactElement {
  const labelId = useId();
  const contextValue = useContext(GlobalStateContext);

  invariant(contextValue != null, 'Не подключен провайдер!');

  const [, dispatch] = contextValue;
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({
    resolver: zodResolver(validateLogin),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginDataType> = (data) => {
    if (data.login === 'admin' && data.password === 'Admin5') {
      dispatch({
        type: 'login',
      });
      onClose();
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className={styles['popup-backdrop']}>
      <div className={styles.popup}>
        <Button className={styles.close} circle onClick={onClose}>
          X
        </Button>
        <form
          className={styles['popup-form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={`${labelId}-login`}>Логин:</label>
            <Input id={`${labelId}-login`} type="text" {...register('login')} />
            {errors.login && (
              <span className={styles['error-message']}>
                {errors.login.message}
              </span>
            )}
          </div>
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={`${labelId}-pass`}>Пароль:</label>
            <Input
              id={`${labelId}-pass`}
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <span className={styles['error-message']}>
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={!isValid}>
            Войти
          </Button>
        </form>
        {errorMessage && (
          <div className={styles['error-message']}>
            Нет такого сочетания логина и пароля
          </div>
        )}
      </div>
    </div>
  );
}
