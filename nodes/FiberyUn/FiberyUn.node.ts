import { INodeType, INodeTypeDescription, NodeConnectionType,
	// IDataObject,
	INodeExecutionData, IExecuteFunctions, ILoadOptionsFunctions} from 'n8n-workflow';

// @ts-ignore
import Fibery from 'fibery-unofficial';

// 	import {
// 	OptionsWithUri,
// } from 'request';

export class FiberyUn implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Fibery (Unofficial)',
		name: 'fiberyUn',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Use Fibery API',
		defaults: {
			name: 'Fibery (Unofficial)',
		},
		inputs: ['main' as NodeConnectionType],
		outputs: ['main' as NodeConnectionType],
		credentials: [
			{
				name: 'fiberyUnApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Schema',
						value: 'schema',
					},
				],
				default: 'schema', // The initially selected option
				noDataExpression: true,
				description: 'Resource to consume',
			},
			{
				displayName: 'Space',
				name: 'space',
				type: 'options',
				typeOptions: {
						loadOptionsDependsOn: ['schema'],
						loadOptionsMethod: 'getSpaces',
				},
				default: '',
		}
		]
	};

	methods = {
		loadOptions: {
				async getSpaces(this: ILoadOptionsFunctions) {
						// Credentials
					const credentials = await this.getCredentials("fiberyUnApi");
					const ACCOUNT = credentials.account;
					const API_KEY =credentials.apiKey;
					const fibery = new Fibery({host: `${ACCOUNT}.fibery.io`, token: API_KEY});

					// Get Schema
					const schema = await fibery.getSchema();

					// Filtering Schema to get only user created Spaces
					function filterFiberyFields(data: any) {
						return data.filter((entry: any) => !entry["fibery/name"].startsWith("fibery/") &&
						!entry["fibery/name"].endsWith("_deleted"))
					}
					const filteredData = filterFiberyFields(schema);


					// Restructure filtered schema to have spaces as keys
					const grouped = filteredData.reduce((acc: any, item: any) => {
						// Split the "fibery/name" into prefix and suffix
						const [key, name] = item["fibery/name"].split("/");

						// Initialize the key in the accumulator if it doesn't exist
						if (!acc[key]) {
							acc[key] = [];
						}

						// Push an object with the extracted name and the original fibery/fields
						acc[key].push({
							name, // the part after "/"
							"fibery/fields": item["fibery/fields"]
						});

						return acc;
					}, {});

					const spaces = Object.keys(grouped);

						// Map response to n8n options format
						return spaces.map(space_name => ({
								name: space_name,
								value: space_name,
						})
					);
				},
		},
};

	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData = {a: 1}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
