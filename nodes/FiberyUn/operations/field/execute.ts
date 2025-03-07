import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
//@ts-ignore
import Fibery from 'fibery-unofficial';
import { groupSchemaBySpace } from '../../utils/groupSchema';

export async function executeField(
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
		case 'getFieldsFromType': {
			// Fetch and group the schema
			const schema = await fibery.getSchema();
			const grouped = groupSchemaBySpace(schema);
			// Assume "space" parameter is used to select a particular group
			const space = this.getNodeParameter('space', 0)?.toString() ?? '';
			const type = this.getNodeParameter('type', 0)?.toString() ?? '';
			const space_type = `${space}/${type}`
			const type_fields_obj = grouped[space].filter(element => element['fibery/name'] == space_type);
			const type_fields = type_fields_obj.map(element => element['fibery/fields']);

			return [this.helpers.returnJsonArray(type_fields)];
			// return [this.helpers.returnJsonArray(grouped[space] || {})];
		}

		default:
			throw new Error(`Operation "${operation}" is not supported for Schema resource.`);
	}
}
