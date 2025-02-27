import { ILoadOptionsFunctions } from 'n8n-workflow';
import { groupSchemaBySpace } from '../utils/groupSchema';

//@ts-ignore
import Fibery from 'fibery-unofficial';

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

	const selected_space = this.getCurrentNodeParameter('space')?.toString() ?? "";
	const types_raw = grouped[selected_space]
	const types = types_raw.map((entry:any) => (entry['fibery/name'].split("/")[1]) )

	// Return options in the format n8n expects
	return types.map((type_name:any) => ({
		name: type_name,
		value: type_name,
	}));
}
