const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const electronReload = require("electron-reload");

const AuthProvider = require("./outlook/AuthProvider");
const { protectedResources, msalConfig } = require("./outlook/authConfig");
const getGraphClient = require("./outlook/graph");

electronReload();

let authProvider;
let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
		autoHideMenuBar: true,
	});
	mainWindow.maximize();
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

// ipcMain.handle("login-outlook", async () => {
// 	// const account = await authProvider.login();
// 	await authProvider.login();
// 	// await mainWindow.loadFile("index.html");
// 	// console.log(account);

// 	const mailData = await retrieve("/messages");
// 	return mailData;
// 	// mainWindow.webContents.send("post-login-greeting", accountDetails);
// });

ipcMain.handle("get-mail-folders", async () => {
	const mailFolders = await retrieve("/mailFolders");
	return mailFolders;
});

ipcMain.handle("get-mails", async (event, folderId) => {
	console.log(folderId);
	const mails = await retrieve(`/mailFolders/${folderId}/messages`);
	return mails;
});

const retrieve = async (url) => {
	const tokenRequest = {
		scopes: protectedResources.graphMe.scopes,
	};
	const tokenResponse = await authProvider.getToken(tokenRequest);
	const graphResponse = await getGraphClient(tokenResponse.accessToken)
		// .api(protectedResources.graphMe.endpoint)
		.api(`${protectedResources.graphMe.endpoint}${url}`)
		.get();
	return graphResponse;
};

// ipcMain.on("retrieve-mails", async () => {
// 	const tokenRequest = {
// 		scopes: protectedResources.graphMe.scopes,
// 	};

// 	const tokenResponse = await authProvider.getToken(tokenRequest);

// 	// await mainWindow.loadFile(path.join(__dirname, "./index.html"));
// 	await mainWindow.loadFile("public/index.html");

// 	const graphResponse = await getGraphClient(tokenResponse.accessToken)
// 		// .api(protectedResources.graphMe.endpoint)
// 		.api(`${protectedResources.graphMe.endpoint}/messages`)
// 		.get();
// 	// console.log(graphResponse);
// 	mainWindow.webContents.send("show-mails", graphResponse);
// });
