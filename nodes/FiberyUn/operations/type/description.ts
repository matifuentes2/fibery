import { INodePropertyOptions } from 'n8n-workflow';

export const schemaOperations: INodePropertyOptions[] = [
	{
		name: 'Get many by Space',
		value: 'getTypeBySpace',
		description: 'Retrieve all the Types from a given Space'
	},
	// {
	// 	name: 'Another Schema Operation',
	// 	value: 'anotherSchemaOp',
	// 	description: 'Do something else with the schema',
	// },
];
