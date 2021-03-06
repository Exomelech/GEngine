const { app, BrowserWindow } = require('electron');
const path = require('path');

if( require('electron-squirrel-startup') ){ // eslint-disable-line global-require
  app.quit();
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //win.setMenu(null);
  // @ts-ignore
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  win.loadFile('../bundle/index.html');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});