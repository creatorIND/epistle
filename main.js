const { app, BrowserWindow } = require("electron");
const path = require("path");
const AuthProvider = require("./outlook/AuthProvider");
const { protectedResources, msalConfig } = require("./outlook/authConfig");
const getGraphClient = require("./outlook/graph");

let authProvider;
const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	win.loadFile("index.html");
	authProvider = new AuthProvider(msalConfig);
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
