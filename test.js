	// Retrieve credentials from the node's context
	const credentials = await this.getCredentials('fiberyUnApi');
	const ACCOUNT = credentials.account;
	const API_KEY = credentials.apiKey;

	// Initialize the Fibery client
	const fibery = new Fibery({ host: `${ACCOUNT}.fibery.io`, token: API_KEY });

	// Fetch the complete schema from Fibery
	const schema = await fibery.getSchema();

	// Use a utility function to group/filter the schema
	const grouped = groupSpaceBySchema(schema);
