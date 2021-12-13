import { Avatar, Text, HStack, Stack, Box, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Friend = {
  src: string;
  alt: string;
  nickName: string;
  age: number;
  gender: string;
  role: string;
};

type FriendsListProps = {
  showRole: boolean;
  showInvitation: boolean;
};

export const FriendsList = ({ showRole, showInvitation }: FriendsListProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    setFriends(
      Array(20).fill({
        src: "https://avatars0.githubusercontent.com/u/1164541?v=4",
        alt: "Author",
        nickName: "닉네임",
        age: 20,
        gender: "남",
        role: "member",
      })
    );
  }, []);

  return (
    <Stack spacing={4}>
      {friends.map((friend, idx) => (
        <HStack justify="space-between" key={`friend-${idx}`}>
          <HStack spacing={4}>
            <Avatar src={friend.src} alt={friend.alt} size="md" />
            <Box>
              <Text fontWeight={600}>{friend.nickName}</Text>
              <Text color={"gray.500"}>
                {friend.age}대 / {friend.gender}
              </Text>
            </Box>
          </HStack>

          {friend.role === "member" ? (
            <Tag variant="solid" colorScheme="cyan">
              참여 중
            </Tag>
          ) : friend.role === "creator" ? (
            <Tag variant="solid" backgroundColor="cyan.700">
              생성자
            </Tag>
          ) : undefined}
        </HStack>
      ))}
    </Stack>
  );
};
