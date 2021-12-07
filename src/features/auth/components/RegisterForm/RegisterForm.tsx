import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  HStack,
  Select,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <form>
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel>이름</FormLabel>
          <Input type="text" placeholder="이름을 입력해주세요." />
        </FormControl>
        <HStack>
          <Box flexGrow="1">
            <FormControl id="gender">
              <FormLabel>성별</FormLabel>
              <Select>
                <option value="option1">남성</option>
                <option value="option2">여성</option>
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow="1">
            <FormControl id="birth-date">
              <FormLabel>생년월일</FormLabel>
              <Input type="date" />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="nickname">
          <FormLabel>닉네임</FormLabel>
          <Input type="text" placeholder="닉네임을 입력해주세요." />
        </FormControl>
        <FormControl id="email">
          <FormLabel>이메일</FormLabel>
          <Input type="email" placeholder="이메일을 입력해주세요." />
        </FormControl>
        <FormControl id="password">
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </FormControl>
        <FormControl id="password-confirm">
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
        </FormControl>
        <Box>
          <Text fontSize="sm">이미 계정이 있으신가요?</Text>
          <ChakraLink as={Link} to="/login" color={"cyan.600"}>
            로그인
          </ChakraLink>
        </Box>
        <Button type="submit" colorScheme="cyan" size="lg" isFullWidth my={4}>
          회원가입
        </Button>
      </Stack>
    </form>
  );
};
