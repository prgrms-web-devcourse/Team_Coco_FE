import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

import { getValidChildren } from "@/utils/children";

type ActionsMenuProps = PropsWithChildren<{
  icon: React.ReactElement;
}>;

export const ActionsMenu = ({ icon, children }: ActionsMenuProps) => {
  const validChildren = getValidChildren(children);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="unstyle"
        icon={icon}
      />
      <MenuList>
        {React.Children.map(validChildren, (child) => {
          return <MenuItem>{child}</MenuItem>;
        })}
      </MenuList>
    </Menu>
  );
};
