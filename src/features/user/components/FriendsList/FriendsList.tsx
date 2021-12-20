import { Center, Button, Stack, Flex } from "@chakra-ui/react";

import { CustomSpinner } from "@/components/CustomSpinner";
import { User } from "@/components/User";
import { useFriendsData, useDeleteFriendData } from "@/features/user/hooks";
import { isEmpty } from "@/utils/assertion";

export const FriendsList = () => {
  const { data: friends, isLoading: friendsLoading } = useFriendsData();
  const { mutate: deleteFriend } = useDeleteFriendData();
  return (
    <Stack spacing={4} minH="50vh">
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
                colorScheme={"red"}
                onClick={() => {
                  deleteFriend({ friendId: friend.id });
                }}
              >
                삭제
              </Button>
            </Flex>
          );
        })
      )}
    </Stack>
  );
};
