import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

type UserProps = {
  size: "sm" | "md";
};

export const User = ({ size }: UserProps) => {
  return (
    <HStack spacing={4}>
      <Avatar
        src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
        alt={"Author"}
        size={size}
      />
      <Box>
        <Text fontSize={size} fontWeight={600}>
          닉네임
        </Text>
        <Text fontSize={size} color={"gray.500"}>
          연령대 / 성별
        </Text>
      </Box>
    </HStack>
  );
};
