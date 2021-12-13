import {
  Stack,
  HStack,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Text,
} from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";

import { User } from "@/components/User";

export const Comment = () => {
  return (
    <Stack spacing={4}>
      <HStack>
        <Avatar size="sm" />
        <InputGroup size="sm">
          <Input placeholder="댓글을 입력하세요"></Input>;
          <InputRightElement
            children={
              <IconButton
                type="submit"
                aria-label="comment"
                variant="unstyled"
                icon={<IoSendSharp />}
              />
            }
          />
        </InputGroup>
      </HStack>
      <Stack>
        <Divider />
        <User size="sm" />
        <Text pl={12} fontSize="md">
          동해 물과 백두산이마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화
          삼천리 화려 강산
        </Text>
        <Text pl={12} fontSize="sm" color="gray.500">
          2021년 10월 21일 14:00
        </Text>
      </Stack>
      <Stack>
        <Divider />
        <User size="sm" />
        <Text pl={12} fontSize="md">
          동해 물과 백두산이마르고 동해 물과 백두산이마르고 닳도록 하느님이
          보우하사 우리나라 만세 무궁화 삼천리 화려 강산
        </Text>
        <Text pl={12} fontSize="sm" color="gray.500">
          2021년 10월 21일 14:00
        </Text>
      </Stack>
      <Stack>
        <Divider />
        <User size="sm" />
        <Text pl={12} fontSize="md">
          동해 물과 백두산이마르고 닳도록 하느님이 보우하사 동해 물과 백두산이마
        </Text>
        <Text pl={12} fontSize="sm" color="gray.500">
          2021년 10월 21일 14:00
        </Text>
      </Stack>
    </Stack>
  );
};
