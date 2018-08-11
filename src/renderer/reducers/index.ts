import { combineReducers } from 'redux';
import * as buttonReducer from './buttonReducer';

export interface IRootState {
  buttonReducer: buttonReducer.IButtonReducerState;
}

export type RootAction =
  | buttonReducer.ButtonActions;

export const combinedReducers = combineReducers<IRootState, RootAction>({
  buttonReducer: buttonReducer.reducer,
});
