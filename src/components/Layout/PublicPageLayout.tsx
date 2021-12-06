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
    <>
      <Head title={title} description={description} />
      {children}
    </>
  );
};
