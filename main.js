const { app, BrowserWindow } = require('electron');
const path = require('path');

if( require('electron-squirrel-startup') ){
  app.quit();
};

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "./src/preloader.js")
    }
  });
  win.setMenu(null);
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  win.webContents.openDevTools();
  win.webContents.on( 'before-input-event', (e, input) => {
    if( !input.isAutoRepeat ){
      console.log(input);
    };
    /* 
      input = {  
        type: 'keyUp',
        key: 'w',
        code: 'KeyW',
        isAutoRepeat: false,
        isComposing: false,
        shift: false,
        control: false,
        alt: false,
        meta: false
      }
    */
  });
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