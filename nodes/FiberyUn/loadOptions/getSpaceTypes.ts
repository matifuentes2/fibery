import { ILoadOptionsFunctions } from 'n8n-workflow';

//@ts-ignore
import Fibery from 'fibery-unofficial';
import { groupSchemaBySpace } from '../utils/groupSchema';

export async function getSpaceTypes(
	this: ILoadOptionsFunctions,
): Promise<Array<{ name: string; value: string }>> {

	// Retrieve credentials from the node's context
	const credentials = await this.getCredentials('fiberyUnApi');
	const ACCOUNT = credentials.account;
	const API_KEY = credentials.apiKey;

	// Initialize the Fibery client
	const fibery = new Fibery({ host: `${ACCOUNT}.fibery.io`, token: API_KEY });

	// Fetch the complete schema from Fibery
	const schema = await fibery.getSchema();

	// Use a utility function to group/filter the schema
	const grouped = groupSchemaBySpace(schema);

	// Get the keys (space names) from the grouped object
	const spaces = Object.keys(grouped);

	// Return options in the format n8n expects
	return spaces.map(space_name => ({
		name: space_name,
		value: space_name,
	}));
}
