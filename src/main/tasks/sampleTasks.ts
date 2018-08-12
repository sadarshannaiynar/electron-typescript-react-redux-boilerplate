import { IpcMain, IpcMessageEvent } from 'electron';
import { EXEC_LS } from '../../common/constants/commandTypes';
import { executeCommand } from '../helpers/execute';
import { getCommand } from './commands';

const sampleTasks = {
  bind: (ipcMain: IpcMain): void => {
    ipcMain.on(EXEC_LS, (event: IpcMessageEvent) => {
      executeCommand(getCommand(EXEC_LS), event, EXEC_LS);
    });
  },
};

export default sampleTasks;
