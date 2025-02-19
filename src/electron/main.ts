// Import parts of electron to use
import { app, BrowserWindow, ipcMain } from 'electron';
import path from'path';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,},
            //preload: app.getAppPath() + '/dist-electron/preload.js'},
        width: 1080,
        height: 1024,
        show: false,
        icon: app.getAppPath() + "/dist-react/vite.svg"
    });
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}
// ---------------------------------------------------

// Application boot up and boot down

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    if (arg === 'ping') event.reply('asynchronous-reply', 'pong!');
    else event.reply('asynchronous-reply', 'please, send me ping.');
});
