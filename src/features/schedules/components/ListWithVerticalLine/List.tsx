import { Stack, StackProps } from "@chakra-ui/react";
import React, { PropsWithChildren, useMemo, cloneElement } from "react";

import { getValidChildren } from "@/utils/children";

type ListProps = PropsWithChildren<StackProps>;

export const List = (props: ListProps) => {
  const { children, ...stackProps } = props;
  const validChildren = getValidChildren(children);

  const items = useMemo(
    () =>
      React.Children.map(validChildren, (item, index) =>
        index + 1 === validChildren.length
          ? cloneElement(item, { isLastItem: true })
          : item
      ),
    [validChildren]
  );
  return (
    <Stack as="ul" {...stackProps}>
      {items}
    </Stack>
  );
};
