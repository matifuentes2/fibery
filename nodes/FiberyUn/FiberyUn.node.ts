import {
	INodeType,
	INodeExecutionData,
	IExecuteFunctions,
} from 'n8n-workflow';

// Import loadOptions methods
import { getSchemaSpaces } from './loadOptions/getSchemaSpaces';
import { getOperations } from './loadOptions/getOperations';
// Import resource operation descriptions

// import { otherResourceOperations } from './operations/otherResource/description';
// Import execution handlers

//@ts-ignore
import { executeSchema } from './operations/schema/execute';
import { executeType } from './operations/type/execute';
import { executeEntity } from './operations/entity/execute';
// import { executeOtherResource } from './operations/otherResource/execute';
import { FiberyUnDescription } from './FiberyUnDescription';
import { getSpaceTypes } from './loadOptions/getSpaceTypes';
import { executeField } from './operations/field/execute';

export class FiberyUn implements INodeType {
	description = FiberyUnDescription;

	methods = {
		loadOptions: {
			getSchemaSpaces,
			getSpaceTypes,
			getOperations
			// You can add other load options methods for additional resources
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Retrieve selected resource and operation
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		switch(resource){
			case 'schema':{
				return executeSchema.call(this, operation);
			}
			case 'type':{
				return executeType.call(this, operation);
			}
			case 'entity':{
				return executeEntity.call(this, operation);
			}
			case 'field':{
				return executeField.call(this, operation);
			}
			default:{
				throw new Error(`Resource "${resource}" is not implemented!`);
			}
		}
	}
}
