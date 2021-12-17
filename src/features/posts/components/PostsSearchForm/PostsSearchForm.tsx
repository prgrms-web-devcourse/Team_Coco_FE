import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Stack,
  Select,
  HStack,
  VisuallyHidden,
  RadioGroup,
  Radio,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import type { GetPostsDTO } from "@/features/posts/hooks";
import type { Omit } from "@/utils/types";

type PostsSearchFormProps = {
  setSearchState: Dispatch<SetStateAction<GetPostsDTO>>;
};

type FormValues = Omit<GetPostsDTO, "sorting">;

export const PostsSearchForm = ({ setSearchState }: PostsSearchFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setSearchState((prevState) => ({ ...prevState, ...values }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="searchingCity">
          <FormLabel>도시</FormLabel>
          <Select
            placeholder="도시를 선택해 주세요"
            {...register("searchingCity")}
          >
            <option>서울</option>
            <option>제주</option>
            <option>부산</option>
            <option>인천</option>
            <option>대구</option>
            <option>대전</option>
            <option>광주</option>
            <option>울산</option>
            <option>전주</option>
          </Select>
        </FormControl>

        <FormControl id="searchingTheme">
          <FormLabel>테마</FormLabel>
          <Controller
            name="searchingTheme"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <RadioGroup colorScheme="cyan" defaultValue="all" {...rest}>
                <HStack>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="all"></Radio>
                    <Text color="gray.400">전체</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="nature"></Radio>
                    <Text color="gray.400">자연</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="art"></Radio>
                    <Text color="gray.400">예술</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="history"></Radio>
                    <Text color="gray.400">역사</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="food"></Radio>
                    <Text color="gray.400">맛집</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Radio value="activity"></Radio>
                    <Text color="gray.400">액티비티</Text>
                  </Flex>
                </HStack>
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl id="search">
          <VisuallyHidden>
            <FormLabel>검색어</FormLabel>
          </VisuallyHidden>
          <InputGroup w="full">
            <Input
              placeholder="제목 또는 본문을 입력해주세요"
              {...register("search")}
            />
            <InputRightAddon
              p="0"
              children={<Button type="submit">검색</Button>}
            />
          </InputGroup>
        </FormControl>
      </Stack>
    </form>
  );
};
