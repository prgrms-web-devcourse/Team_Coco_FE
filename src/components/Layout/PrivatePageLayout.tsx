import { Box } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";

import { Head } from "../Head";
import { Header } from "../Header";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
  header: ReactNode;
}>;

export const PrivatePageLayout = ({
  children,
  title,
  description = "",
  header,
}: PageLayoutProps) => {
  return (
    <Box pt="80px" pb="4rem">
      <Head title={title} description={description} />
      <Header>{header}</Header>
      {children}
    </Box>
  );
};
