import { PropsWithChildren } from "react";
import React from "react";

import { Head } from "../Head";

type PageLayoutProps = PropsWithChildren<{
  title: string;
}>;

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};
