const { app, BrowserWindow } = require('electron');

if( require('electron-squirrel-startup') ){ // eslint-disable-line global-require
  app.quit();
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });
  win.setMenu(null);
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  win.webContents.openDevTools();
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