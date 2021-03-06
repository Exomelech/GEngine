const { app, BrowserWindow } = require('electron');

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