import * as electron from 'electron';
import * as path from 'path';

if (process.platform === 'darwin') {
  process.env.PATH = [
    './node_modules/.bin',
    '/.nodebrew/current/bin',
    '/usr/local/bin',
    process.env.PATH,
  ].join(':');
}

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow: electron.BrowserWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      webSecurity: (process.env.NODE_ENV !== 'development'),
    },
    width: 800,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8100');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.resolve(__dirname, '../index.html')}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
