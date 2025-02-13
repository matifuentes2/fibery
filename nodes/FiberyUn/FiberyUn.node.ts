import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	INodeExecutionData,
	IExecuteFunctions,
} from 'n8n-workflow';

// Import loadOptions methods
import { getSchemaSpaces } from './loadOptions/getSchemaSpaces';
import { getOperations } from './loadOptions/getOperations';
// Import resource operation descriptions
//@ts-ignore
import { schemaOperations } from './operations/schema/description';
// import { otherResourceOperations } from './operations/otherResource/description';
// Import execution handlers

//@ts-ignore
import { executeSchema } from './operations/schema/execute';
// import { executeOtherResource } from './operations/otherResource/execute';

export class FiberyUn implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fibery (Unofficial)',
		name: 'fiberyUn',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
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
				noDataExpression: true,
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Schema',
						value: 'schema',
					},
					{
						name: 'Type',
						value: 'type',
					},
					{
						name: 'Field',
						value: 'field',
					}
				],
				default: 'schema',
				description: 'Resource to interact with',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				typeOptions: {
					loadOptionsDependsOn: ['resource'],
					loadOptionsMethod: 'getOperations',
				},
				displayOptions: {
					show: {
						resource: ['schema', 'type'],
					},
				},
				default: "",
			},
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['otherResource'],
			// 		},
			// 	},
			// 	options: otherResourceOperations,
			// 	default: otherResourceOperations[0].value,
			// 	description: 'Operation to perform for Other Resource',
			// },
			// Additional parameters common to all resources can be added here
			{
				displayName: 'Space',
				name: 'space',
				type: 'options',
				typeOptions: {
					loadOptionsDependsOn: ['resource', 'operation'],
					loadOptionsMethod: 'getSchemaSpaces',
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['type'],
						operation: ['getTypeBySpace']
					},
				},
				description: 'Select a space for Schema resource',
			},
		],
	};

	methods = {
		loadOptions: {
			getSchemaSpaces,
			getOperations
			// You can add other load options methods for additional resources
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Retrieve selected resource and operation
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Dispatch execution based on resource and operation
		if (resource === 'schema') {
			return executeSchema.call(this, operation);
		// } else if (resource === 'otherResource') {
		// 	return executeOtherResource.call(this, operation);
		} else {
			throw new Error(`Resource "${resource}" is not implemented!`);
		}
	}
}
