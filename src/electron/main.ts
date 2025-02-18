import {app, BrowserWindow} from 'electron';
import path from 'path';
type test = string;
app.on('ready', () => {
    const mainWindow = new BrowserWindow({width: 1060, height: 1024});
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
})