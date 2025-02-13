import { INodeProperties} from "n8n-workflow";

export const FiberyUnOperations: INodeProperties = {
	displayName: 'Operation',
	noDataExpression: true,
	name: 'operation',
	type: 'options',
	typeOptions: {
		loadOptionsDependsOn: ['resource'],
		loadOptionsMethod: 'getOperations',
	},
	displayOptions: {
		show: {
			resource: ['schema', 'type', 'entity', 'field'],
		},
	},
	default: "",
}
