import type { ActionType, GlobalStateType } from 'App/globalReducer';
import { createContext } from 'react';

type GlobalStateContextType =
  | [GlobalStateType, React.Dispatch<ActionType>]
  | null;

export const GlobalStateContext = createContext<GlobalStateContextType>(null);
