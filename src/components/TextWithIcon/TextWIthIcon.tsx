import {
  Box,
  HStack,
  StackProps,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type TextWithIconProps = StackProps &
  PropsWithChildren<{
    icon: React.ReactElement;
  }>;

export const TextWithIcon = (props: TextWithIconProps) => {
  const { icon, children, ...rest } = props;
  return (
    <HStack {...rest}>
      <Box color={mode("gray.400", "gray.600")} aria-hidden>
        {icon}
      </Box>
      <Text
        fontWeight="medium"
        fontSize="sm"
        lineHeight="1"
        color={mode("gray.600", "gray.400")}
      >
        {children}
      </Text>
    </HStack>
  );
};
