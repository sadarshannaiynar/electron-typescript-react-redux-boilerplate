module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './test/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/(main|renderer)/.*.spec.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/renderer/**/*.{ts,tsx}',
    '**/src/main/**/*.{ts,tsx}',
    '!src/main/dist',
    '!src/main/tasks/index.ts',
    '!src/main/index.ts',
    '!src/renderer/store.ts',
    '!src/renderer/index.tsx',
    '!src/renderer/reducers/index.ts',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/test/renderer/setupEnzyme.ts',
  testPathIgnorePatterns: ['/node_modules/', 'setupEnzyme.ts', 'store.ts'],
}