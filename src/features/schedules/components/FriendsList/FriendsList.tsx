import {
  Avatar,
  Text,
  HStack,
  Stack,
  Box,
  Tag,
  Button,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAddMember } from "../../hooks";

import { CustomSpinner } from "@/components/CustomSpinner";
import { User } from "@/components/User";
import { MemberSimpleResponse } from "@/features/memo/types";
import { useFriendsData, useDeleteFriendData } from "@/features/user/hooks";
import { isEmpty } from "@/utils/assertion";

type Friend = {
  src: string;
  alt: string;
  nickName: string;
  age: number;
  gender: string;
  role: string;
};

type FriendsListProps = {
  members: MemberSimpleResponse[];
  scheduleId: number;
};

export const FriendsList = ({ members, scheduleId }: FriendsListProps) => {
  const { data: friends, isLoading: friendsLoading } = useFriendsData();
  const { mutate: deleteFriend, isLoading: deleteFriendLoading } =
    useDeleteFriendData();
  const { mutate: addMember, isLoading: addMemberLoading } = useAddMember();

  return (
    <Stack spacing={4}>
      {friendsLoading ? (
        <Center w="100%">
          <CustomSpinner />
        </Center>
      ) : isEmpty(friends) ? (
        <div>친구가 없습니다</div>
      ) : (
        friends.map((friend) => {
          return (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={friend.id}
            >
              <User size="sm" nickname={friend.nickname} />
              <Button
                size="xs"
                colorScheme={"cyan"}
                onClick={() => {
                  addMember({
                    scheduleId: scheduleId,
                    data: { friendId: friend.id },
                  });
                }}
                isLoading={deleteFriendLoading}
              >
                초대
              </Button>
            </Flex>
          );
        })
      )}
    </Stack>
  );
  // return (
  //   <Stack spacing={4}>
  //     {friends.map((friend, idx) => (
  //       <HStack justify="space-between" key={`friend-${idx}`}>
  //         <HStack spacing={4}>
  //           <Avatar src={friend.src} alt={friend.alt} size="md" />
  //           <Box>
  //             <Text fontWeight={600}>{friend.nickName}</Text>
  //             <Text color={"gray.500"}>
  //               {friend.age}대 / {friend.gender}
  //             </Text>
  //           </Box>
  //         </HStack>

  //         {friend.role === "member" ? (
  //           <Tag variant="solid" colorScheme="cyan">
  //             참여 중
  //           </Tag>
  //         ) : friend.role === "creator" ? (
  //           <Tag variant="solid" backgroundColor="cyan.700">
  //             생성자
  //           </Tag>
  //         ) : undefined}
  //       </HStack>
  //     ))}
  //   </Stack>
  // );
};
