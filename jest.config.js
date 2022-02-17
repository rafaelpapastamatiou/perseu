module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  // preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@modules/(.*)': ['<rootDir>/src/modules/$1'],
    '@main/(.*)': ['<rootDir>/src/main/$1'],
    '@core/(.*)': ['<rootDir>/src/core/$1'],
  },
};
