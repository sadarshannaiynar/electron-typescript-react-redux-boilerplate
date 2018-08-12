import { IpcMain, IpcRenderer } from 'electron';
import { EXEC_LS } from '../../../src/common/constants/commandTypes';
import { getCommand } from '../../../src/main/tasks/commands';
import sampleTasks from '../../../src/main/tasks/sampleTasks';

jest.mock('../../../src/main/helpers/execute.ts');

describe('sampleTasks Tests', () => {
  test('should fire task for EXEC_LS', (done) => {
    const { executeCommand } = require('../../../src/main/helpers/execute');
    const electronIpcMock = require('electron-ipc-mock')();
    const ipcMain = electronIpcMock.ipcMain;
    const ipcRenderer: IpcRenderer = electronIpcMock.ipcRenderer;

    sampleTasks.bind(ipcMain);
    ipcRenderer.send(EXEC_LS);

    /* This timeout is essential to give time for the event to fire */
    setTimeout(() => {
      expect(executeCommand).toHaveBeenCalledTimes(1);
      done();
    }, 1);
  });
});
