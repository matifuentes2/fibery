import {
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { FiberyUnResources } from './FiberyUnResources';
import { FiberyUnOperations } from './FiberyUnOperations';
import { FiberyUnSpaces } from './FiberyUnSpaces';

export const FiberyUnDescription: INodeTypeDescription = {
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

		FiberyUnResources,
		FiberyUnOperations,
		FiberyUnSpaces

	],
}
