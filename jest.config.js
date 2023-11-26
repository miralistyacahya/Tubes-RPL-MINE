module.exports = {
  testMatch: ["**/tests/**/*\.test.ts"],
  transform: {
     "^.+\\.ts$": "babel-jest",
  },
  setupFiles: ["<rootDir>/.jest/env.js"],
};