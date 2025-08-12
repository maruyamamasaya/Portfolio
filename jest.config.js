module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    '^.+\\.js$': [
      'babel-jest',
      { configFile: false, presets: [['@babel/preset-env', { targets: { node: 'current' } }]] },
    ],
  },
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
