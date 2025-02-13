import { INodeProperties} from "n8n-workflow";

export const FiberyUnSpaces: INodeProperties = {
	displayName: 'Space',
	name: 'space',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getSchemaSpaces',
	},
	default: '',
	displayOptions: {
		show: {
			resource: ['type', 'entity'],
			operation: ['getTypeBySpace', 'createEntity']
		},
	},
	description: 'Select a space for Schema resource',
}
