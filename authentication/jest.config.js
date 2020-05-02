module.exports = {
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
  verbose: false,
  clearMocks: true,
  resetModules: true,
  coveragePathIgnorePatterns: ["/__tests__/"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts"]
};
