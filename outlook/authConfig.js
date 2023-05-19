const { LogLevel } = require("@azure/msal-node");

const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/";

const msalConfig = {
	auth: {
		clientId: "e6344782-fc4a-40de-9e25-720121e1ba3e",
		authority: `${AAD_ENDPOINT_HOST}common`,
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			loglevel: LogLevel.Verbose,
		},
	},
};

const GRAPH_ENDPOINT_HOST = "https://graph.microsoft.com/";

const protectedResources = {
	graphMe: {
		endpoint: `${GRAPH_ENDPOINT_HOST}v1.0/me`,
		scopes: ["User.Read", "Mail.Read"],
	},
};

module.exports = {
	msalConfig,
	protectedResources,
};
