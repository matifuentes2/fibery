import { ILoadOptionsFunctions } from 'n8n-workflow';
//@ts-ignore
import Fibery from 'fibery-unofficial';

export async function getOperations(
	this: ILoadOptionsFunctions
): Promise<Array<{ name: string; value: string }>> {

	const resource = this.getCurrentNodeParameter('resource')?.toString();
	let operations;

	switch(resource){
		case 'schema': {
			operations = [
				{name: "Get", value: "getSchema"},
				{name: "Test", value: "testAction"}
			];
			break
		}
		case 'type': {
			operations = [
				{name: "Get many by Space", value: "getTypeBySpace"}
			];
			break
		}
	}
	// Return options in the format n8n expects
	return operations ?? [{name: "", value: ""}]
}
