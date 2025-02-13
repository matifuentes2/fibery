import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
//@ts-ignore
import Fibery from 'fibery-unofficial';
import { schemaOperations } from '../operations/schema/description';
import { typeOperations } from '../operations/type/description';
import { entityOperations } from '../operations/entity/description';

export async function getOperations(
	this: ILoadOptionsFunctions
): Promise<INodePropertyOptions[]> {

	const resource = this.getCurrentNodeParameter('resource')?.toString();
	let operations;

	switch(resource){
		case 'schema': {
			operations = schemaOperations;
			break
		}
		case 'type': {
			operations = typeOperations;
			break
		}
		case 'entity': {
			operations = entityOperations;
			break
		}
	}
	// Return options in the format n8n expects
	return operations ?? [{name: "", value: ""}]
}
