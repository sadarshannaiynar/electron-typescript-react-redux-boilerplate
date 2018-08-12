module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './test/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/renderer/.*.spec.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/renderer',
  collectCoverageFrom: [
    '**/src/renderer/**/*.{ts,tsx}',
    '!src/renderer/store.ts',
    '!src/renderer/index.tsx',
    '!src/renderer/reducers/index.ts',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/test/renderer/setupEnzyme.ts',
  testPathIgnorePatterns: ['/node_modules/', 'setupEnzyme.ts', 'store.ts'],
}