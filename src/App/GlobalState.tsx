import { Button } from 'components/Button';
import { ReactElement, ReactNode, useEffect, useReducer, useRef } from 'react';
import { invariant } from 'shared/invariant';
import { z } from 'zod';
import { GlobalStateContext } from '../shared/GlobalStateContext';
import styles from './GlobalState.module.css';
import { globalReducer } from './globalReducer';

const globalStateValidation = z.object({
  isLogin: z.boolean(),
  isError: z.string(),
});

type GlobalStateType = z.infer<typeof globalStateValidation>;

const initialState = (): GlobalStateType => {
  const storedData = localStorage.getItem('authorizationState');
  const initGlobalState = {
    isLogin: storedData ? JSON.parse(storedData) : false,
    isError: '',
  };
  const validatedResult = globalStateValidation.safeParse(initGlobalState);

  invariant(validatedResult.success, 'Неверный формат данных');

  return validatedResult.data;
};

export function GlobalState({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const globalStateWithSetter = useReducer(globalReducer, null, initialState);

  const [globalState, dispatch] = globalStateWithSetter;

  useEffect(() => {
    localStorage.setItem(
      'authorizationState',
      JSON.stringify(globalState.isLogin),
    );
  }, [globalState.isLogin]);

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (globalState.isError && !modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, [globalState.isError]);

  return (
    <GlobalStateContext.Provider value={globalStateWithSetter}>
      <dialog className={styles.dialog} ref={modalRef}>
        <h3>Состояние загрузки:</h3>
        <p>Произошла ошибка</p>
        <p>{globalState.isError}</p>
        <Button
          type="button"
          onClick={() => {
            modalRef.current?.close();
            dispatch({
              type: 'eraseError',
            });
          }}
        >
          Закрыть
        </Button>
      </dialog>
      {children}
    </GlobalStateContext.Provider>
  );
}
