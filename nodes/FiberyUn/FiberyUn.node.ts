import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	INodeExecutionData,
	IExecuteFunctions,
} from 'n8n-workflow';

// Import loadOptions methods
import { getSchemaSpaces } from './loadOptions/getSchemaSpaces';
// Import resource operation descriptions
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
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Schema',
						value: 'schema',
					},
					{
						name: 'Other Resource',
						value: 'otherResource',
					},
				],
				default: 'schema',
				description: 'Resource to interact with',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['schema'],
					},
				},
				options: schemaOperations,
				default: schemaOperations[0].value,
				description: 'Operation to perform for Schema',
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
					loadOptionsDependsOn: ['resource'],
					loadOptionsMethod: 'getSchemaSpaces',
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['schema'],
					},
				},
				description: 'Select a space for Schema resource',
			},
		],
	};

	methods = {
		loadOptions: {
			getSchemaSpaces,
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
