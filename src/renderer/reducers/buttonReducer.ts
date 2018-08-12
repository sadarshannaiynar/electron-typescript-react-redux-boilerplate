import { ActionType, getType } from 'typesafe-actions';
import { EXEC_LS } from '../../common/constants/commandTypes';
import * as buttonActions from '../actions/buttonActions';
import { DECREMENT_VALUE, EXEC_LS_ERROR, EXEC_LS_SUCCESS, INCREMENT_VALUE, SET_VALUE } from '../constants/actionTypes';

export type ButtonActions = ActionType<typeof buttonActions>;

export interface IButtonReducerState {
  readonly value: number;
  readonly output: string;
  readonly error: string;
}

const defaultState: IButtonReducerState = {
  error: '',
  output: '',
  value: 0,
};

export const reducer = (state: IButtonReducerState = defaultState, action?: ButtonActions): IButtonReducerState => {
  if (action) {
    switch (action.type) {
      case INCREMENT_VALUE:
        return {
          ...state,
          value: state.value + 1,
        };
      case DECREMENT_VALUE:
        return {
          ...state,
          value: state.value - 1,
        };
      case SET_VALUE:
        return {
          ...state,
          value: action.payload,
        };
      case EXEC_LS:
        return {
          ...state,
          error: '',
          output: '',
        };
      case EXEC_LS_SUCCESS:
        return {
          ...state,
          output: action.payload,
        };
      case EXEC_LS_ERROR:
        return {
          ...state,
          error: action.payload,
        };
    }
  }
  return { ...state };
};
