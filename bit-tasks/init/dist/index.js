// Import necessary modules
const process = require('process');
const console = require('console');

// Check if either BIT_CONFIG_USER_TOKEN or BIT_CLOUD_ACCESS_TOKEN is not set
if (!process.env.BIT_CONFIG_USER_TOKEN || !process.env.BIT_CLOUD_ACCESS_TOKEN) {
  console.error('Neither BIT_CONFIG_USER_TOKEN nor BIT_CLOUD_ACCESS_TOKEN environment variable is set. At least one of them is required!');
  process.exit(1);
}

// Export the updated index.js file
module.exports = {};
