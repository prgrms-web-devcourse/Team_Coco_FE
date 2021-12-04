import { extendTheme } from "@chakra-ui/react";

import { config } from "./config";
import foundations from "./foundations";

const overrides = {
  colors: {},
  config,
  ...foundations,
};

export default extendTheme(overrides);
