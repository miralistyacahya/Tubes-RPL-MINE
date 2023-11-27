module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ["**/tests/**/*\.test.tsx"],
  transform: {
     "^.+\\.tsx$": "ts-jest",
  },
  setupFiles: ["<rootDir>/.jest/env.js"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};