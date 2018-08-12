import { IpcMessageEvent, IpcRenderer } from 'electron';
import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { EXEC_LS } from '../../common/constants/commandTypes';
import { DECREMENT_VALUE, EXEC_LS_ERROR, EXEC_LS_SUCCESS, INCREMENT_VALUE, SET_VALUE } from '../constants/actionTypes';

export interface IEventOutput {
  log: string;
}

export const incrementAction = () => action(INCREMENT_VALUE);

export const decrementAction = () => action(DECREMENT_VALUE);

export const setValue = (value: number) => action(SET_VALUE, value);

export const startExecuteLs = () => action(EXEC_LS);

export const successExecuteLs = (output: string) => action(EXEC_LS_SUCCESS, output);

export const errorExecuteLs = (error: string) => action(EXEC_LS_ERROR, error);

export const executeLs = (ipcRenderer: IpcRenderer): any => (
  (dispatch: Dispatch) => {
    ipcRenderer.send(EXEC_LS);
    dispatch(startExecuteLs());

    ipcRenderer.once(`success-${EXEC_LS}`, (event: IpcMessageEvent, { log }: IEventOutput) => {
      dispatch(successExecuteLs(log));
      ipcRenderer.removeAllListeners(`error-${EXEC_LS}`);
    });

    ipcRenderer.once(`error-${EXEC_LS}`, (event: IpcMessageEvent, { log }: IEventOutput) => {
      dispatch(errorExecuteLs(log));
      ipcRenderer.removeAllListeners(`success-${EXEC_LS}`);
    });
  }
);
