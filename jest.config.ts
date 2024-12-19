import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
};

export default createJestConfig(config);
