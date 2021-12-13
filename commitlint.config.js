module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [
      2,
      "always",
      [
        "lower-case", // default
        "camel-case", // camelCase
        "pascal-case", // PascalCase
        "sentence-case", // Sentence case
        "start-case", // Start Case // Start Case
      ],
    ],
  },
};
