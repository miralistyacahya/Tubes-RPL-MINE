const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})


const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^jose$': require.resolve('jose'),
  },

}

module.exports = async (...args) => {
  const fn = createJestConfig(customJestConfig);
  const res = await fn(...args);

  res.transformIgnorePatterns = res.transformIgnorePatterns.map((pattern) => {
      if (pattern === '/node_modules/') {
          return '/node_modules(?!/next)/';
      }
      return pattern;
  });

  return res;
}; 