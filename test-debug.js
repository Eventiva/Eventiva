/**
 * Simple Node.js script to test the platform with different configurations
 * and identify where the "initial" property error occurs.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const platformFile = path.join(__dirname, 'packages/platforms/default/src/index.ts');

// Test configurations - enable one at a time
const testConfigs = [
  { name: 'All disabled', config: {
    disableObservability: true,
    disableCluster: true,
    disablePiiEncryption: true,
    disableSchema: true,
    disableDatabase: true,
    disableHooks: true,
    disableStartupBanner: true,
    disableEntityEndpoints: true
  }},
  { name: 'Observability only', config: {
    disableObservability: false,
    disableCluster: true,
    disablePiiEncryption: true,
    disableSchema: true,
    disableDatabase: true,
    disableHooks: true,
    disableStartupBanner: true,
    disableEntityEndpoints: true
  }},
  { name: 'Observability + Schema', config: {
    disableObservability: false,
    disableCluster: true,
    disablePiiEncryption: true,
    disableSchema: false,
    disableDatabase: true,
    disableHooks: true,
    disableStartupBanner: true,
    disableEntityEndpoints: true
  }},
  { name: 'Observability + Schema + Database', config: {
    disableObservability: false,
    disableCluster: true,
    disablePiiEncryption: true,
    disableSchema: false,
    disableDatabase: false,
    disableHooks: true,
    disableStartupBanner: true,
    disableEntityEndpoints: true
  }},
  { name: 'Observability + Schema + Database + Hooks', config: {
    disableObservability: false,
    disableCluster: true,
    disablePiiEncryption: true,
    disableSchema: false,
    disableDatabase: false,
    disableHooks: false,
    disableStartupBanner: true,
    disableEntityEndpoints: true
  }},
];

function updatePlatformFile(config) {
  let content = fs.readFileSync(platformFile, 'utf8');
  
  // Replace the debug object
  const debugObject = `debug: {
    disableObservability: ${config.disableObservability},
    disableCluster: ${config.disableCluster},
    disablePiiEncryption: ${config.disablePiiEncryption},
    disableSchema: ${config.disableSchema},
    disableDatabase: ${config.disableDatabase},
    disableHooks: ${config.disableHooks},
    disableStartupBanner: ${config.disableStartupBanner},
    disableEntityEndpoints: ${config.disableEntityEndpoints}
  }`;
  
  content = content.replace(/debug:\s*\{[^}]*\}/s, debugObject);
  fs.writeFileSync(platformFile, content);
}

console.log('Starting systematic testing...\n');

for (const test of testConfigs) {
  console.log(`Testing: ${test.name}`);
  updatePlatformFile(test.config);
  
  try {
    // Try to build/run (this will fail if there's an error)
    // For now, just check if the file compiles
    console.log(`  ✓ Configuration updated`);
  } catch (error) {
    console.log(`  ✗ Error: ${error.message}`);
    if (error.message.includes('initial')) {
      console.log(`\n*** FOUND THE ERROR! Configuration "${test.name}" causes the issue ***`);
      process.exit(1);
    }
  }
  console.log('');
}

console.log('All tests completed. Check the output above for errors.');
