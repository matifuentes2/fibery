export function groupSchema(schema: any[]): Record<string, any[]> {
	// Filter out system entries based on naming conventions
	const filteredData = schema.filter((entry: any) => {
		const name = entry['fibery/name'];
		return !name.startsWith('fibery/') && !name.endsWith('_deleted');
	});

	// Group the filtered data by the prefix in "fibery/name"
	return filteredData.reduce((acc: Record<string, any[]>, item: any) => {
		const [key, name] = item['fibery/name'].split('/');
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push({
			name, // the part after "/"
			'fibery/fields': item['fibery/fields'],
		});
		return acc;
	}, {});
}
