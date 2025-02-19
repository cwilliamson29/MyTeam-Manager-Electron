import { ipcRenderer } from 'electron';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function send(message) {
    return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', message);
    });
}