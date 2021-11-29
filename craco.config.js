const emotionPresetOptions = {};
const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  emotionPresetOptions
);
const CracoAlias = require("craco-alias");

module.exports = {
  babel: {
    plugins: [...emotionBabelPreset.plugins],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
