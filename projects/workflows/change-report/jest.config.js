module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}