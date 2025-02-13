import { INodeProperties} from "n8n-workflow";

export const FiberyUnResources: INodeProperties = {
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
		},
		{
			name: 'Entity',
			value: 'entity',
		}
	],
	default: 'schema',
	description: 'Resource to interact with',
};
