import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <form>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>이메일</FormLabel>
          <Input type="email" placeholder="이메일을 입력해주세요." />
        </FormControl>
        <FormControl id="password">
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </FormControl>
        <Box>
          <Button type="submit" colorScheme="cyan" size="lg" isFullWidth my={4}>
            로그인
          </Button>
        </Box>
        <Box>
          <Text fontSize="sm">아직 계정이 없으신가요?</Text>
          <ChakraLink as={Link} to="/register" color={"cyan.600"}>
            회원가입
          </ChakraLink>
        </Box>
      </Stack>
    </form>
  );
};
