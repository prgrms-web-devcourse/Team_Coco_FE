module.exports = {
  processors: ["stylelint-processor-styled-components"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-styled-components",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  syntax: "scss"
};
