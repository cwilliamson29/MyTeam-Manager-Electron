import { contextBridge, ipcRenderer } from "electron";

export type Channels = "minimizeApp" | "maximizeApp" | "closeApp";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args;
		return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args;
		return ipcRenderer.off(channel, ...omit);
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args;
		return ipcRenderer.send(channel, ...omit);
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args;
		return ipcRenderer.invoke(channel, ...omit);
	},

	// You can expose other APTs you need here.
	// ...
});

contextBridge.exposeInMainWorld("electron", {
	ipcRenderer: {
		sendMessage(channel: Channels, args: unknown[]) {
			ipcRenderer.send(channel, args);
		},
	},
});

contextBridge.exposeInMainWorld("updater", {
	show: false,
	// @ts-ignore
	setShow: (val: boolean) => (this.show = val),
	showDialog: async () => ipcRenderer.invoke("dialog:open"),
});
