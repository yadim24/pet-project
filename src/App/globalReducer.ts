export type GlobalStateType = {
  isLogin: boolean;
  isError: string;
};

export type ActionType =
  | {
      type: 'login' | 'logout' | 'eraseError';
    }
  | {
      type: 'catchError';
      error: string;
    };

export function globalReducer(
  globalState: GlobalStateType,
  action: ActionType,
): GlobalStateType {
  switch (action.type) {
    case 'login': {
      return {
        ...globalState,
        isLogin: true,
      };
    }

    case 'logout': {
      return {
        ...globalState,
        isLogin: false,
      };
    }

    case 'catchError': {
      return {
        ...globalState,
        isError: action.error,
      };
    }

    case 'eraseError': {
      return {
        ...globalState,
        isError: '',
      };
    }

    default: {
      const exhaustiveValue: never = action;

      return exhaustiveValue;
    }
  }
}
