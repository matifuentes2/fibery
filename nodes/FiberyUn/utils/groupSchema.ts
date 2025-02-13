export function groupSchemaBySpace(schema: any[]): Record<string, any[]> {
	// Filter out system entries based on naming conventions
	const filteredData = schema.filter((entry: any) => {
		const name = entry['fibery/name'];
		return !name.startsWith('fibery/') && !name.endsWith('_deleted');
	});

	// Group the filtered data by the prefix in "fibery/name"
	return filteredData.reduce((acc: Record<string, any[]>, item: any) => {
		const og_name = item['fibery/name']
		const [key, _] = og_name.split('/');
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push({
			'name': og_name, // the part after "/"
			'fibery/fields': item['fibery/fields'],
		});
		return acc;
	}, {});
}
