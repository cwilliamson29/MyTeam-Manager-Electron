// Import parts of electron to use
import { app, ipcMain, BrowserWindow } from 'electron';
import path from'path';
import url from 'url';
import storage from "electron-json-storage";
import {HANDLE_FETCH_DATA, FETCH_DATA_FROM_STORAGE, HANDLE_SAVE_DATA, SAVE_DATA_IN_STORAGE, REMOVE_DATA_FROM_STORAGE, HANDLE_REMOVE_DATA} from "./utils/const.js"
//import {HANDLE_FETCH_DATA} from "./utils/const.js";


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// @ts-ignore
let mainWindow: any;

// A reference to the itemsToTrack array, full of JS/JSON objects. All mutations to the array are performed in the main.js app, but each mutation will trigger a rewrite to the user's storage for data persistence
// @ts-ignore
let itemsToTrack: any[] =[];

// Keep a reference for dev mode
let dev = false;
if ( (process as any).defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
    dev = true;
}

// Keep a reference to the default path to userData, which will act as the app's database. It may not be necessary to use this
const defaultDataPath = storage.getDefaultDataPath();
// On Mac: /Users/[username]/Library/Application Support/[app-name]/storage

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1080, height: 1024, show: false, icon: app.getAppPath() + "/dist-react/vite.svg"
    });
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));

    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Open the DevTools automatically if developing
        if ( dev ) {
            mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.webContents.send("info", {msg: "hello from main process"})

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
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
    if (mainWindow === null) {
        createWindow();
    }
});

// --------------------------------------------------------------

// ipcMain methods are how we interact between the window and (this) main program

// Receives a FETCH_DATA_FROM_STORAGE from renderer
ipcMain.on(FETCH_DATA_FROM_STORAGE, (event: any, message: any) => {
    console.log("Main received: FETCH_DATA_FROM_STORAGE with message:", message)
    // Get the user's itemsToTrack from storage
    // For our purposes, message = itemsToTrack array
    storage.get(message, (error: any, data: any) => {
        // if the itemsToTrack key does not yet exist in storage, data returns an empty object, so we will declare itemsToTrack to be an empty array
        itemsToTrack = JSON.stringify(data) === '{}' ? [] : data;
        if (error) {
            mainWindow.send(HANDLE_FETCH_DATA, {
                success: false,
                message: "itemsToTrack not returned",
            })
        } else {
            // Send message back to window
            mainWindow.send(HANDLE_FETCH_DATA, {
                success: true,
                message: itemsToTrack, // do something with the data
            })
        }
    })
})

// Receive a SAVE_DATA_IN_STORAGE call from renderer
ipcMain.on(SAVE_DATA_IN_STORAGE, (event: any, message : any) => {
    console.log("Main received: SAVE_DATA_IN_STORAGE")
    // update the itemsToTrack array.
    itemsToTrack.push(message)
    // Save itemsToTrack to storage
    storage.set("itemsToTrack", itemsToTrack, (error: any) => {
        if (error) {
            console.log("We errored! What was data?")
            mainWindow.send(HANDLE_SAVE_DATA, {
                success: false,
                message: "itemsToTrack not saved",
            })
        } else {
            // Send message back to window as 2nd arg "data"
            mainWindow.send(HANDLE_SAVE_DATA, {
                success: true,
                message: message,
            })
        }
    })
});

// Receive a REMOVE_DATA_FROM_STORAGE call from renderer
ipcMain.on(REMOVE_DATA_FROM_STORAGE, (event: any, message: any) => {
    console.log('Main Received: REMOVE_DATA_FROM_STORAGE')
    // Update the items to Track array.
    itemsToTrack = itemsToTrack.filter(item => item !== message)
    // Save itemsToTrack to storage
    storage.set("itemsToTrack", itemsToTrack, (error: any) => {
        if (error) {
            console.log("We errored! What was data?")
            mainWindow.send(HANDLE_REMOVE_DATA, {
                success: false,
                message: "itemsToTrack not saved",
            })
        } else {
            // Send new updated array to window as 2nd arg "data"
            mainWindow.send(HANDLE_REMOVE_DATA, {
                success: true,
                message: itemsToTrack,
            })
        }
    })
})
// app.on('ready', () => {
//     const mainWindow = new BrowserWindow({width: 1060, height: 1024});
//     mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
// })