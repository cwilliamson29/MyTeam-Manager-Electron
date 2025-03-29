import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import contextMenu from "electron-context-menu";
import icon from "../src/assets/react.svg";
import { autoUpdater } from "electron-updater";
import { log } from "electron-log";

// log.transports.file.level = "debug";
// autoUpdater.logger = log();
autoUpdater.autoDownload = false;

contextMenu({
	showSaveImageAs: true,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

function createWindow(): void {
	const win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		width: 1075,
		height: 900,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
			preload: path.join(__dirname, "preload.mjs"),
		},
	});
	console.log("here");
	win.on("ready-to-show", () => {
		win.show();
	});

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, "index.html"));
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(() => {
	createWindow();
	autoUpdater.checkForUpdates();

	//log(autoUpdater.checkForUpdates());

	autoUpdater.on("checking-for-update", () => {
		//dialog.
		dialog.showMessageBox({
			type: "info",
			title: "Checking for Updates",
			message: "Checking for updates...",
		});
	});
	log("before update-available");
	autoUpdater.on("update-available", () => {
		//log("inside update-available, but befor dia");
		dialog
			.showMessageBox({
				type: "question",
				title: "Update Available",
				message: "A new version of the app is available. Do you want to update now?",
				buttons: ["Update", "No"],
			})
			.then((response) => {
				log(response.response + ":is the index");
				//log(":is the index");
				if (response.response === 0) {
					log("inside if for download dialog");
					//log(autoUpdater.downloadUpdate())
					autoUpdater.downloadUpdate();
				}
			});
	});

	autoUpdater.on("download-progress", (progressObj) => {
		let log_message = "Download speed: " + progressObj.bytesPerSecond;
		log_message = log_message + " - Downloaded " + progressObj.percent + "%";
		log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
		log(log_message);
	});

	// @ts-ignore
	autoUpdater.on("update-downloaded", (info) => {
		log("inside updater for downloaded");
		dialog
			.showMessageBox({
				type: "info",
				title: "Update Downloaded",
				message: "The new version has been downloaded. It will be installed on restart. Do you want to restart now?",
				buttons: ["Restart", "Later"],
			})
			.then((response) => {
				log(response + " :update downloaded");
				// if (index === 0) {
				// 	autoUpdater.quitAndInstall();
				// }
			});
	});
});

ipcMain.handle("dialog:open", async () => {
	return await dialog.showMessageBox({
		type: "info",
		message: "This is a custom message box",
		buttons: ["OK", "Cancel"],
		defaultId: 0,
		cancelId: 1,
		icon: path.join(__dirname, "assets/react.png"),
	});
});
