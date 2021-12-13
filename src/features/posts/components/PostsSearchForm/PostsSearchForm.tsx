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
  chakra,
  VisuallyHidden,
  CheckboxGroup,
  Checkbox,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

export const PostsSearchForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((values: any) => {
    console.log({ values });
  });

  return (
    <chakra.form onSubmit={onSubmit}>
      <Stack spacing={4}>
        <FormControl id="city">
          <FormLabel>도시</FormLabel>
          <Select placeholder="도시를 선택해 주세요" {...register("city")}>
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

        <FormControl id="theme">
          <FormLabel>테마</FormLabel>
          <Controller
            name="theme"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <CheckboxGroup
                colorScheme="cyan"
                {...rest}
                defaultValue={["all"]}
              >
                <HStack>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="all"></Checkbox>
                    <Text color="gray.400">전체</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="nature"></Checkbox>
                    <Text color="gray.400">자연</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="art"></Checkbox>
                    <Text color="gray.400">예술</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="history"></Checkbox>
                    <Text color="gray.400">역사</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="food"></Checkbox>
                    <Text color="gray.400">맛집</Text>
                  </Flex>
                  <Flex direction="column" alignItems="center" flexGrow={1}>
                    <Checkbox value="activity"></Checkbox>
                    <Text color="gray.400">액티비티</Text>
                  </Flex>
                </HStack>
              </CheckboxGroup>
            )}
          />
        </FormControl>

        <FormControl id="search-term">
          <VisuallyHidden>
            <FormLabel>검색어</FormLabel>
          </VisuallyHidden>
          <InputGroup w="full">
            <Input
              placeholder="제목 또는 본문을 입력해주세요"
              {...register("search-term")}
            />
            <InputRightAddon
              p="0"
              children={<Button type="submit">검색</Button>}
            />
          </InputGroup>
        </FormControl>
      </Stack>
    </chakra.form>
  );
};
