import Fibery from 'fibery-unofficial';
import fs from 'fs';


// Credentials
const fibery = new Fibery({host: "blueprint.fibery.io", token: process.env.FIBERY_TOKEN});

// Get Schema
const schema = await fibery.getSchema();

// Filtering Schema to get only user created Tables
function filterFiberyFields(data) {
  return data.filter(entry => !entry["fibery/name"].startsWith("fibery/") &
	!entry["fibery/name"].endsWith("_deleted"))
}

const filteredData = filterFiberyFields(schema);


// Restructure filtered schema to have spaces as keys

const grouped = filteredData.reduce((acc, item) => {
  // Split the "fibery/name" into prefix and suffix
  const [key, name] = item["fibery/name"].split("/");

  // Initialize the key in the accumulator if it doesn't exist
  if (!acc[key]) {
    acc[key] = [];
  }

  // Push an object with the extracted name and the original fibery/fields
  acc[key].push({
    name, // the part after "/"
    "fibery/fields": item["fibery/fields"]
  });

  return acc;
}, {});

const spaces = Object.keys(grouped);



// Write to a file

// Grouped
// Convert the object to a JSON string
const jsonString = JSON.stringify(grouped, null, 2);

fs.writeFile('grouped.json', jsonString, (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File successfully written!');
    }
});

// Spaces Array
fs.writeFile('spaces.txt', spaces.toString(), (err) => {
	if (err) {
			console.error('Error writing spaces file', err);
	} else {
			console.log('Spaces file successfully written!');
	}
});
