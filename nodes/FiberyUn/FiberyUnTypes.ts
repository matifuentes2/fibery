import { INodeProperties } from "n8n-workflow";

export const FiberyUnTypes: INodeProperties = {
	displayName: 'Type Name or ID',
	name: 'type',
	type: 'options',
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'space'],
		loadOptionsMethod: 'getSpaceTypes',
	},
	default: '',
	displayOptions: {
		show: {
			resource: ['field'],
			operation: ['getFieldsFromType']
		},
	},
	description: 'Select a space for Schema resource. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
}
