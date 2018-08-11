import { ActionType, getType } from 'typesafe-actions';
import * as buttonActions from '../actions/buttonActions';
import { DECREMENT_VALUE, INCREMENT_VALUE, SET_VALUE } from '../constants/actionTypes';

export type ButtonActions = ActionType<typeof buttonActions>;

export interface IButtonReducerState {
  readonly value: number;
}

const defaultState: IButtonReducerState = {
  value: 0,
};

export const reducer = (state: IButtonReducerState = defaultState, action: ButtonActions): IButtonReducerState => {
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
  }
  return { ...state };
};
