import { IpcMessageEvent } from 'electron';
import reduxMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { EXEC_LS } from '../../../src/common/constants/commandTypes';
import * as actions from '../../../src/renderer/actions/buttonActions';

// tslint:disable-next-line:no-var-requires
const electronIpcMock = require('electron-ipc-mock')();

describe('buttonActions Tests', () => {
  describe('Actions Tests', () => {
    test('should return the increment action', () => {
      expect(actions.incrementAction()).toMatchSnapshot();
    });

    test('should return the decrement action', () => {
      expect(actions.decrementAction()).toMatchSnapshot();
    });

    test('should return the setValue action', () => {
      expect(actions.setValue(0)).toMatchSnapshot();
    });

    test('should return the startExecuteLs action', () => {
      expect(actions.startExecuteLs()).toMatchSnapshot();
    });

    test('should return the successExecuteLs action', () => {
      expect(actions.successExecuteLs('Success')).toMatchSnapshot();
    });

    test('should return the errorExecuteLs action', () => {
      expect(actions.errorExecuteLs('Error')).toMatchSnapshot();
    });
  });

  describe('Store Dispatch Tests', () => {
    const mockStore = reduxMockStore([reduxThunk]);

    test('should update the store on increment action', () => {
      const store = mockStore({});
      store.dispatch(actions.incrementAction());
      expect(store.getActions()[0]).toMatchSnapshot();
    });

    test('should update the store on decrement action', () => {
      const store = mockStore({});
      store.dispatch(actions.decrementAction());
      expect(store.getActions()[0]).toMatchSnapshot();
    });

    test('should update the store on setValue action', () => {
      const store = mockStore({});
      store.dispatch(actions.setValue(0));
      expect(store.getActions()[0]).toMatchSnapshot();
    });

    test('should update the store on executeLs action with success reply', (done) => {
      const store = mockStore({});
      const { ipcMain, ipcRenderer } = electronIpcMock;
      ipcMain.on(EXEC_LS, (event: IpcMessageEvent) => {
        event.sender.send(`success-${EXEC_LS}`, { log: 'Output' });
        ipcMain.removeAllListeners(EXEC_LS);
      });

      store.dispatch(actions.executeLs(ipcRenderer));
      expect(store.getActions()[0]).toMatchObject(actions.startExecuteLs());

      ipcRenderer.on(`success-${EXEC_LS}`, () => {
        expect(store.getActions()[1]).toMatchObject(actions.successExecuteLs('Output'));
        expect(store.getActions()).toMatchSnapshot();
        ipcRenderer.removeAllListeners(`success-${EXEC_LS}`);
        done();
      });
    });

    test('should update the store on executeLs action with error reply', (done) => {
      const store = mockStore({});
      const { ipcMain, ipcRenderer } = electronIpcMock;
      ipcMain.on(EXEC_LS, (event: IpcMessageEvent) => {
        event.sender.send(`error-${EXEC_LS}`, { log: 'Error' });
        ipcMain.removeAllListeners(EXEC_LS);
      });

      store.dispatch(actions.executeLs(ipcRenderer));
      expect(store.getActions()[0]).toMatchObject(actions.startExecuteLs());

      ipcRenderer.on(`error-${EXEC_LS}`, () => {
        expect(store.getActions()[1]).toMatchObject(actions.errorExecuteLs('Error'));
        expect(store.getActions()).toMatchSnapshot();
        ipcRenderer.removeAllListeners(`error-${EXEC_LS}`);
        done();
      });
    });
  });
});
