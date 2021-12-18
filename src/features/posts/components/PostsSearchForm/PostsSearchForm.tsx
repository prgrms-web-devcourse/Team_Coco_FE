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

import { cities } from "@/features/posts/constants";
import { searchThemes } from "@/features/posts/constants";
import type { GetPostsDTO } from "@/features/posts/hooks";
import { objectEntries } from "@/utils/object";
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
            defaultValue="전체"
            {...register("searchingCity")}
          >
            <option value="전체">전체</option>
            {cities.map((city, idx) => {
              return (
                <option key={`city-${idx}`} value={city}>
                  {city}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl id="searchingTheme">
          <FormLabel>테마</FormLabel>
          <Controller
            name="searchingTheme"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <RadioGroup colorScheme="cyan" defaultValue="ALL" {...rest}>
                <HStack>
                  {objectEntries(searchThemes).map(([key, value]) => {
                    return (
                      <Flex
                        direction="column"
                        alignItems="center"
                        flexGrow={1}
                        key={key}
                      >
                        <Radio value={key}></Radio>
                        <Text color="gray.400">{value}</Text>
                      </Flex>
                    );
                  })}
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
