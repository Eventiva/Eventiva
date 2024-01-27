module.exports = {
  // Specify the root directory for tests
  roots: ["<rootDir>/tests"],

  // Define the test environment
  testEnvironment: "node",

  // Specify the test runner
  runner: "jest-runner",

  // Add any necessary test frameworks or libraries
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],

  // Add any necessary test coverage settings
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],

  // Add any necessary test reporters or output formats
  reporters: ["default"],
};
