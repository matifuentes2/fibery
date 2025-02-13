import { INodeProperties} from "n8n-workflow";

export const FiberyUnTypes: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	typeOptions: {
		loadOptionsDependsOn: ['resource'],
		loadOptionsMethod: 'getSpaceTypes',
	},
	default: '',
	displayOptions: {
		show: {
			resource: ['space'],
			operation: ['getFieldsFromType']
		},
	},
	description: 'Select a space for Schema resource',
}
