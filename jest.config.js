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
    '@application/(.*)': ['<rootDir>/src/application/$1'],
    '@infra/(.*)': ['<rootDir>/src/infra/$1'],
    '@presentation/(.*)': ['<rootDir>/src/presentation/$1'],
    '@domain/(.*)': ['<rootDir>/src/domain/$1'],
    '@main/(.*)': ['<rootDir>/src/main/$1'],
  },
};
