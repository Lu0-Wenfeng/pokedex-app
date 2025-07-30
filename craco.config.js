const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    // Path aliases
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./",
        tsConfigPath: "./tsconfig.json",
      },
    },
  ],
};
