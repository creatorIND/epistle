const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

const getGraphClient = (accessToken) => {
	const graphClient = Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});
	return graphClient;
};

module.exports = getGraphClient;
