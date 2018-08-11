import { action } from 'typesafe-actions';
import { DECREMENT_VALUE, INCREMENT_VALUE, SET_VALUE } from '../constants/actionTypes';

export const incrementAction = () => action(INCREMENT_VALUE);

export const decrementAction = () => action(DECREMENT_VALUE);

export const setValue = (value: number) => action(SET_VALUE, value);
