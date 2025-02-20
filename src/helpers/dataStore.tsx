// import { Employee } from "../interfaces/employeeInterface";
//
// export const saveDataInStorage = (item: Employee) => {
//     if (window?.api?.saveDataInStorage) {
//         window.api.saveDataInStorage(item);
//     } else {
//         console.error("saveDataInStorage is not defined on window.API.");
//     }
// };

// export const loadSavedData = ()=> {
//     console.log("Renderer sending: FETCH_DATA_FROM_STORAGE")
//     ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "itemsToTrack")
// }

// // Send item message to main
// export const saveDataInStorage = (item: unknown) => {
//     window.API.saveDataInStorage(item)
// };

// Remove an item
// export const removeDataFromStorage = (item: unknown) => {
//     console.log("Renderer sending: REMOVE_DATA_FROM_STORAGE")
//     ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, item)
// };