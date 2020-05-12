module.exports = {
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ["src"],
    projects: [
      { 
        displayName: "server",
        testMatch: ["<rootDir>/server/**/*.test.ts"],
        testEnvironment: 'node',
        setupFiles: ["<rootDir>/jestEnv.ts"]
      },
      // TODO: test tools with TS
      // { 
      //   displayName: "tools",
      //   testMatch: ["<rootDir>/tools/**/*.test.js"],
      //   testEnvironment: 'node',
      // }
    ]
  };