const Fibery = require('fibery-unofficial');

const fibery = new Fibery({
  host: "blueprint.fibery.io",
  token: process.env.FIBERY_TOKEN
});

async function createPlayer() {
  try {
    await fibery.entity.createBatch([
      {
        'type': 'Test Space/Person',
        'entity': {
          'Test Space/Name': 'Curtly Ambrose',
        }
      }
    ]);

    console.log("Player created successfully!");
  } catch (error) {
    console.error("Error creating player:", error);
  }
}

createPlayer();
