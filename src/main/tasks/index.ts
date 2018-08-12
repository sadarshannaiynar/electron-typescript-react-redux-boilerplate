import sampleTasks from './sampleTasks';

const tasks = {
  bind: (electron: Electron.MainInterface): void => {
    const ipcMain = electron.ipcMain;
    sampleTasks.bind(ipcMain);
  },
};

export default tasks;
