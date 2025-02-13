import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
//@ts-ignore
import Fibery from 'fibery-unofficial';
import { groupSchema } from '../../utils/groupSchema';

export async function executeEntity(
	this: IExecuteFunctions,
	operation: string
): Promise<INodeExecutionData[][]> {
	// Retrieve credentials
	const credentials = await this.getCredentials('fiberyUnApi');
	const ACCOUNT = credentials.account;
	const API_KEY = credentials.apiKey;

	const fibery = new Fibery({ host: `${ACCOUNT}.fibery.io`, token: API_KEY });

	// Switch based on the selected operation for schema resource
	switch (operation) {
		case 'createEntity': {
			// Fetch and group the schema
			const schema = await fibery.getSchema();
			const grouped = groupSchema(schema);
			// Assume "space" parameter is used to select a particular group
			const space = this.getNodeParameter('space', 0)?.toString() ?? '';
			return [this.helpers.returnJsonArray(grouped[space] || {})];
		}

		default:
			throw new Error(`Operation "${operation}" is not supported for Schema resource.`);
	}
}
