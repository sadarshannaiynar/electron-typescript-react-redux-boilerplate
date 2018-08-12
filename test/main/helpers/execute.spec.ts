import { IpcMessageEvent } from 'electron';
import { executeCommand, ICommandOutput, sendResult } from '../../../src/main/helpers/execute';
import { IEventOutput } from '../../../src/renderer/actions/buttonActions';

jest.mock('child_process');

describe('Helper Tests', () => {
  test('should fire executeCommand', (done) => {
    const { exec } = require('child_process');
    const { ipcMain, ipcRenderer } = require('electron-ipc-mock')();
    ipcMain.on('test', (event: IpcMessageEvent) => {
      executeCommand('echo HELLO', event, 'ECHO');
      expect(exec).toHaveBeenCalledTimes(1);
      expect(exec).toHaveBeenLastCalledWith('echo HELLO', expect.any(Function));
      ipcMain.removeAllListeners('test');
      done();
    });
    ipcRenderer.send('test');
  });

  test('should fire sendResult for success', (done) => {
    const { ipcMain, ipcRenderer } = require('electron-ipc-mock')();
    ipcMain.on('test', (event: IpcMessageEvent) => {
      const outputObject: ICommandOutput = {
        error: null,
        errorLog: '',
        output: 'output',
      };
      sendResult(event, 'test', outputObject);
      ipcMain.removeAllListeners('test');
    });

    ipcRenderer.on('success-test', (event: IpcMessageEvent, { log }: IEventOutput) => {
      expect(log).toStrictEqual('output');
      ipcRenderer.removeAllListeners('success-test');
      done();
    });

    ipcRenderer.send('test');
  });

  test('should fire sendResult for error', (done) => {
    const { exec } = require('child_process');
    const { ipcMain, ipcRenderer } = require('electron-ipc-mock')();
    ipcMain.on('test', (event: IpcMessageEvent) => {
      const outputObject: ICommandOutput = {
        error: new Error(),
        errorLog: 'error',
        output: '',
      };
      sendResult(event, 'test', outputObject);
      ipcMain.removeAllListeners('test');
    });

    ipcRenderer.on('error-test', (event: IpcMessageEvent, { log }: IEventOutput) => {
      expect(log).toStrictEqual('error');
      ipcRenderer.removeAllListeners('error-test');
      done();
    });

    ipcRenderer.send('test');
  });
});
