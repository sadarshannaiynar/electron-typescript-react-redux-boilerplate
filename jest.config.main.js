module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './test/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/main/.*.spec.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/main',
  collectCoverageFrom: [
    '**/src/main/**/*.{ts,tsx}',
    '!src/main/dist',
    '!src/main/tasks/index.ts',
    '!src/main/index.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
}