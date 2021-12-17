import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

type UserProps = {
  size: "sm" | "md";
  nickname?: string;
  gender?: string;
};

export const User = ({ size, nickname = "", gender = "" }: UserProps) => {
  return (
    <HStack spacing={4}>
      <Avatar name={nickname} alt={"User"} size={size} />
      <Box>
        <Text fontSize={size} fontWeight={600}>
          {nickname}
        </Text>
        <Text fontSize={size} color={"gray.500"}>
          {gender}
        </Text>
      </Box>
    </HStack>
  );
};
