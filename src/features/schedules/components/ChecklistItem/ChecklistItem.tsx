import { Flex, ListItem } from "@chakra-ui/layout";
import { Checkbox, IconButton } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

type ChecklistItemProps = {
  content: string;
  checked: boolean;
};

export const ChecklistItem = ({ content, checked }: ChecklistItemProps) => {
  return (
    <ListItem my="1">
      <Flex justify="space-between">
        <Checkbox defaultChecked={checked}>{content}</Checkbox>
        <IconButton
          aria-label="delete-todo"
          size="xs"
          icon={<IoClose />}
          variant="ghost"
          mr="3"
        />
      </Flex>
    </ListItem>
  );
};
