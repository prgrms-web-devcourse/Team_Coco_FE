import {
  chakra,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useOutsideClick,
  Stack,
  Center,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import * as yup from "yup";

import { CustomSpinner } from "@/components/CustomSpinner";
import { User } from "@/components/User";
import {
  useSearchUserData,
  useFriendsData,
  useAddFriendData,
  useDeleteFriendData,
} from "@/features/user/hooks";
import { isEmpty } from "@/utils/assertion";
import { storage } from "@/utils/storage";

const schema = yup.object().shape({
  nickname: yup.string().min(1).max(255).required(),
});

type FormValues = {
  nickname: string;
};

export const UserSearchForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nickname, setNickname] = useState("");
  const { data: users, isLoading: usersLoading } = useSearchUserData({
    nickname,
    enabled: !!nickname,
  });
  const { mutate: addFriend } = useAddFriendData();
  const { mutate: deleteFriend } = useDeleteFriendData();
  const { data: friends } = useFriendsData();
  const friendsIds = friends.map((friend) => friend.id);

  const userId = storage.getUserId();

  useOutsideClick({
    ref,
    handler: onClose,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ nickname }) => {
    setNickname(nickname);
  };

  return (
    <chakra.form pos="relative" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size="sm">
        <Input
          placeholder="닉네임을 입력하세요"
          {...register("nickname")}
          isInvalid={Boolean(errors.nickname)}
          onFocus={onOpen}
          autoComplete="off"
        />
        <InputRightElement
          children={
            <IconButton
              type="submit"
              aria-label="nickname"
              icon={<IoSearchOutline />}
              isRound
              variant="unstyle"
              isLoading={isSubmitting}
            />
          }
        />
      </InputGroup>

      <Box
        pos="absolute"
        top="2.5rem"
        zIndex="1"
        w="100%"
        rounded="md"
        shadow="md"
        bg="white"
        ref={ref}
        d={isOpen ? "block" : "none"}
      >
        <Stack spacing={4} my={4} px={4}>
          {usersLoading ? (
            <Center>
              <CustomSpinner />
            </Center>
          ) : isEmpty(users) ? (
            <div>유저가 없습니다.</div>
          ) : (
            users
              .filter((user) => user.id !== userId)
              .map((user) => {
                return (
                  <Flex
                    justifyContent="space-between"
                    key={user.id}
                    alignItems="center"
                  >
                    <User size="sm" nickname={user.nickname} />
                    <Button
                      size="xs"
                      colorScheme={
                        friendsIds.includes(user.id) ? "red" : "cyan"
                      }
                      onClick={() => {
                        friendsIds.includes(user.id)
                          ? deleteFriend({ friendId: user.id })
                          : addFriend({
                              nickname: user.nickname,
                              data: { memberId: user.id },
                            });
                      }}
                    >
                      {friendsIds.includes(user.id) ? "삭제" : "추가"}
                    </Button>
                  </Flex>
                );
              })
          )}
        </Stack>
      </Box>
    </chakra.form>
  );
};
