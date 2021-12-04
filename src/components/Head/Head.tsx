import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps) => {
  return (
    <Helmet
      title={title ? `${title} | 트립플랜(triplan)` : undefined}
      defaultTitle="트립플랜(triplan)"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
