import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

import { Head } from "../Head";

type PublicPageLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export const PublicPageLayout = ({
  children,
  title = "",
  description = "",
}: PublicPageLayoutProps) => {
  return (
    <Box pt="5rem" pb="4rem" minHeight="100vh" h="1px">
      <Head title={title} description={description} />
      {children}
    </Box>
  );
};
