const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	getMails: async () => {
		return await ipcRenderer.invoke("get-mails", folderId);
	},
	getMailFolders: async () => {
		return await ipcRenderer.invoke("get-mail-folders");
	},
	// retrieveMails: () => ipcRenderer.send("retrieve-mails"),
	// showMails: (func) => {
	// 	ipcRenderer.on("show-mails", (event, ...args) => func(event, ...args));
	// },
	// greetUser: (func) => {
	// 	ipcRenderer.on("post-login-greeting", (event, ...args) =>
	// 		func(event, ...args)
	// 	);
	// },
});
