module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  setupFiles: ["./tests/utils/setup.ts"],
  setupFilesAfterEnv: ["./tests/utils/lifecycles.ts"],
};
