import { Stack, Button, Center, Flex, Heading } from "@chakra-ui/react";

import { useAddMember } from "../../hooks";

import { CustomSpinner } from "@/components/CustomSpinner";
import { User } from "@/components/User";
import { MemberSimpleResponse } from "@/features/memo/types";
import { useFriendsData } from "@/features/user/hooks";
import { isEmpty } from "@/utils/assertion";

type FriendsListProps = {
  members: MemberSimpleResponse[];
  scheduleId: number;
};

export const FriendsList = ({ members, scheduleId }: FriendsListProps) => {
  const { data: friends, isLoading: friendsLoading } = useFriendsData();
  const { mutate: addMember, isLoading: addMemberLoading } = useAddMember();

  const identifyMember = (userId: number) =>
    members.some((member) => member.id === userId);

  return (
    <Stack spacing={4}>
      <Heading size="sm" color="gray.600">
        나의 친구 목록
      </Heading>
      {friendsLoading ? (
        <Center w="100%">
          <CustomSpinner />
        </Center>
      ) : isEmpty(friends) ? (
        <div>친구가 없습니다</div>
      ) : (
        friends.map((friend) => {
          const isMember = identifyMember(friend.id);

          return (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={friend.id}
            >
              <User size="sm" nickname={friend.nickname} />

              <Button
                size="xs"
                colorScheme={isMember ? "cyan" : "cyan"}
                color="gray.50"
                onClick={() => {
                  addMember({
                    scheduleId: scheduleId,
                    data: { friendId: friend.id },
                  });
                }}
                isLoading={addMemberLoading}
                disabled={isMember}
              >
                {isMember ? "초대 됨" : "초대"}
              </Button>
            </Flex>
          );
        })
      )}
    </Stack>
  );
};
