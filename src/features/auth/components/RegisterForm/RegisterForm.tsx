import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Text,
  HStack,
  Select,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { DatePicker } from "@/components/DatePicker";
import { useSignUpData } from "@/features/auth/hooks";
import { genderMap } from "@/features/user/constants";
import type { Gender } from "@/features/user/types";
import { formatDateToString } from "@/utils/date";
import { omit, objectEntries, objectKeys } from "@/utils/object";

const schema = yup.object().shape({
  name: yup.string().min(2).max(255).required(),
  gender: yup.string().oneOf(objectKeys(genderMap)).required(),
  birthDate: yup.date().required(),
  nickname: yup.string().min(2).max(255).required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).max(255).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

const defaultValues: FormValues = {
  name: "",
  gender: "MALE",
  birthDate: new Date(),
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type FormValues = {
  name: string;
  gender: Gender;
  birthDate: Date;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: signUp } = useSignUpData();

  const onSubmit: SubmitHandler<FormValues> = async ({
    birthDate,
    ...rest
  }) => {
    await signUp({
      data: {
        birth: formatDateToString(birthDate),
        ...omit(rest, ["confirmPassword"]),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="name" isInvalid={Boolean(errors.name)}>
          <FormLabel>이름</FormLabel>
          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            {...register("name")}
          />
          <FormErrorMessage>
            {errors.name && "이름은 최소 2자 이상이어야 합니다."}
          </FormErrorMessage>
        </FormControl>
        <HStack>
          <Box flexGrow="1">
            <FormControl id="gender" isInvalid={Boolean(errors.gender)}>
              <FormLabel>성별</FormLabel>
              <Select {...register("gender")}>
                {objectEntries(genderMap).map(([gender, label], idx) => {
                  return (
                    <option key={`${gender}-${idx}`} value={gender}>
                      {label}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {errors.gender && "성별은 남성/여성 중 하나여야 합니다."}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box flexGrow="1">
            <FormControl id="birthDate" isInvalid={Boolean(errors.birthDate)}>
              <FormLabel>생년월일</FormLabel>
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker onChange={onChange} selected={value} />
                )}
              />
              <FormErrorMessage>
                {errors.birthDate && "날짜는 yyyy-mm-dd 형식이어야 합니다."}
              </FormErrorMessage>
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="nickname" isInvalid={Boolean(errors.nickname)}>
          <FormLabel>닉네임</FormLabel>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요."
            {...register("nickname")}
          />
          <FormErrorMessage>
            {errors.nickname && "닉네임은 최소 2자 이상이어야 합니다."}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={Boolean(errors.email)}>
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email?.type === "email"
              ? "유효한 이메일 형식을 입력하세요."
              : "이메일은 필수 입력입니다."}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={Boolean(errors.password)}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && "비밀번호는 최소 3자 이상이어야 합니다."}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="confirmPassword"
          isInvalid={Boolean(errors.confirmPassword)}
        >
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            {...register("confirmPassword")}
          />
          <FormErrorMessage>
            {errors.confirmPassword?.type === "required"
              ? "비밀번호 확인은 필수 입력입니다."
              : "입력된 비밀번호와 일치하지 않습니다."}
          </FormErrorMessage>
        </FormControl>
        <Box>
          <Text fontSize="sm">이미 계정이 있으신가요?</Text>
          <ChakraLink as={Link} to="/login" color={"cyan.600"}>
            로그인
          </ChakraLink>
        </Box>
        <Button
          type="submit"
          colorScheme="cyan"
          size="lg"
          isFullWidth
          my={4}
          isLoading={isSubmitting}
        >
          회원가입
        </Button>
      </Stack>
    </form>
  );
};
