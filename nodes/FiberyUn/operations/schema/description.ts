import { INodePropertyOptions } from 'n8n-workflow';

export const schemaOperations: INodePropertyOptions[] = [
	{
		name: 'Get Schema',
		value: 'getSchema',
		description: 'Retrieve the schema details',
	},
	{
		name: 'Another Schema Operation',
		value: 'anotherSchemaOp',
		description: 'Do something else with the schema',
	},
];
