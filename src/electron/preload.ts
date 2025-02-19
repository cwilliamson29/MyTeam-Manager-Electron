// import { contextBridge } from 'electron/renderer'
// import storage from "electron-json-storage";
// import { ipcRenderer } from 'electron';
//

// src/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

// Define the type for the API you want to expose
export type ContextBridgeApi = {
    send: (channel: string, data: unknown) => void;
    on: (channel: string, func: (...args: unknown[]) => void) => void;
};

const exposedApi: ContextBridgeApi = {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, func),
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('api', exposedApi);


// // const saveData = (data: any) => {
// //     let itemsToTrack = []
// //         console.log("Main received: SAVE_DATA_IN_STORAGE")
// //         // update the itemsToTrack array.
// //         itemsToTrack.push(data)
// //         // Save itemsToTrack to storage
// //         storage.set("itemsToTrack", itemsToTrack, (error: any) => {
// //             if (error) throw error
// //         })
// // }
// export type ContextBridgeApi = {
//     readFile: () => Promise<string>
// }
//
// const saveData: ContextBridgeApi = {
//     readFile: (data) => {
//         return storage.set("itemsToTrack", data, (error: any) => {
//             if (error) throw error;
//         });
//         // ipcRenderer.send('save-data-in-storage')
//         // return new Promise((resolve) => {
//         //     ipcRenderer.once('read-file-success', (event, data: string) => resolve(data))
//         // })
//     }
// }
//
// contextBridge.exposeInMainWorld('api', saveData)
// // contextBridge.exposeInMainWorld('electronAPI', {
// //     SaveData: (data) => storage.set("itemsToTrack", data, (error: any) => {
// //         if (error) throw error
// //         // let itemsToTrack = []
// //         // console.log("Main received: SAVE_DATA_IN_STORAGE")
// //         // // update the itemsToTrack array.
// //         // itemsToTrack.push(message)
// //         // // Save itemsToTrack to storage
// //         // storage.set("itemsToTrack", itemsToTrack, (error: any) => {
// //         // if (error) throw error
// //         // })
// //     })
// // })
// // contextBridge.exposeInMainWorld('electronAPI', {
// //     SaveData: (data) => ipcMain.on(SAVE_DATA_IN_STORAGE, (event, message : any) => {
// //         let itemsToTrack = []
// //         console.log("Main received: SAVE_DATA_IN_STORAGE")
// //         // update the itemsToTrack array.
// //         itemsToTrack.push(message)
// //         // Save itemsToTrack to storage
// //         storage.set("itemsToTrack", itemsToTrack, (error: any) => {
// //             if (error) throw error
// //
// //
// //             // if (error) {
// //             //     console.log("We errored! What was data?")
// //             //     mainWindow.send(HANDLE_SAVE_DATA, {
// //             //         success: false,
// //             //         message: "itemsToTrack not saved",
// //             //     })
// //             // } else {
// //             //     // Send message back to window as 2nd arg "data"
// //             //     mainWindow.send(HANDLE_SAVE_DATA, {
// //             //         success: true,
// //             //         message: message,
// //             //     })
// //             // }
// //         })
// //     })
// // })