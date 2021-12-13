import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  StackProps,
} from "@chakra-ui/react";

export type ListItemProps = StackProps & {
  title: string;
  address: string;
  phone?: string;
  isLastItem?: boolean;
};

export const ListItem = (props: ListItemProps) => {
  const { title, address, phone, isLastItem, children, ...stackProps } = props;

  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg={useColorModeValue("cyan.500", "cyan.300")}
          size="4"
          mt="2"
        />
        {!isLastItem && <Flex flex="1" borderRightWidth="2px" mb="-10" />}
      </Flex>
      <Stack spacing="2" pt="1" flex="1">
        <Heading fontSize="md" fontWeight="semibold">
          {title}
        </Heading>
        <Flex direction="column">
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {address}
          </Text>
          <Text fontSize="sm" color={useColorModeValue("cyan.600", "cyan.400")}>
            {phone}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  );
};
