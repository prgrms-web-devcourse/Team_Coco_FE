import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { useLoginData } from "@/features/auth/hooks";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(255).required(),
  })
  .required();

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: login } = useLoginData();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await login({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="email" isInvalid={Boolean(errors.email)}>
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email?.type === "email"
              ? "이메일 형식에 맞게 입력해주세요"
              : "이메일은 필수 입력 사항입니다."}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={Boolean(errors.password)}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="current-password"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && "비밀번호는 최소 3자 이상입니다."}
          </FormErrorMessage>
        </FormControl>
        <Box>
          <Button
            type="submit"
            colorScheme="cyan"
            size="lg"
            isFullWidth
            my={4}
            isLoading={isSubmitting}
          >
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
