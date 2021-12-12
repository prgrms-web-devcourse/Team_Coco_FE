import { HStack, Avatar, Box, Text } from "@chakra-ui/react";

type SimpleUserProps = {
  nickName: string | undefined;
  age: number | undefined;
  gender: any;
};

export const SimpleUser = () => {
  return (
    <HStack spacing={4}>
      <Avatar
        src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
        alt="avatar"
        size="md"
      />
      <Box>
        <Text fontSize="sm">닉네임</Text>
        <Text fontSize="sm" color={"gray.500"}>
          연령대 / 성별
        </Text>
      </Box>
    </HStack>
  );
};
