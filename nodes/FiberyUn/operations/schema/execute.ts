import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
//@ts-ignore
import Fibery from 'fibery-unofficial';

export async function executeSchema(
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
		case 'getSchema': {
			// Fetch and group the schema
			const schema = await fibery.getSchema();
			return [this.helpers.returnJsonArray(schema || {})];
		}
		case 'anotherSchemaOp': {
			// Implement additional schema operation logic here
			// For example, returning the whole schema:
			const schema = await fibery.getSchema();
			return [this.helpers.returnJsonArray(schema)];
		}
		default:
			throw new Error(`Operation "${operation}" is not supported for Schema resource.`);
	}
}
