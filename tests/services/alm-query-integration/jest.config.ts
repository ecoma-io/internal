export default {
  displayName: "alm-query-integration",
  preset: "../../../jest.preset.js",
  globalSetup: "<rootDir>/src/support/global-setup.ts",
  globalTeardown: "<rootDir>/src/support/global-teardown.ts",
  setupFiles: ["<rootDir>/src/support/test-setup.ts"],
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/alm-query-service-e2e",
};
