const Fibery = require('fibery-unofficial');
const fibery = new Fibery({host: "blueprint.fibery.io", token: process.env.FIBERY_TOKEN});

await fibery.entity.createBatch([
  {
    'type': 'Test Space/Test DB',
    'entity': {
      'Test Space/Name': 'hola'
    }
  }
]);
