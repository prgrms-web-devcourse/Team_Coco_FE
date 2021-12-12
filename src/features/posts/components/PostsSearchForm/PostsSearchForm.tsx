import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Stack,
  Select,
  Grid,
  HStack,
  GridItem,
  chakra,
  VisuallyHidden,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { DatePicker } from "@/components/DatePicker";

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

        <FormControl id="city">
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem
              colSpan={2}
              d="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormLabel m="0">도시</FormLabel>
            </GridItem>

            <GridItem colSpan={10}>
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
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl id="date">
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem
              colSpan={2}
              d="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormLabel m="0">날짜</FormLabel>
            </GridItem>
            <GridItem colSpan={10}>
              <DatePicker selected={new Date()} onChange={console.log} />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl id="theme">
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem
              colSpan={2}
              d="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormLabel m="0">테마</FormLabel>
            </GridItem>
            <GridItem colSpan={10} overflow="scroll">
              <Controller
                name="theme"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <HStack>
                      <Checkbox value="naruto">Naruto</Checkbox>
                      <Checkbox value="sasuke">Sasuke</Checkbox>
                      <Checkbox value="kakashi">kakashi</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                )}
              />
            </GridItem>
          </Grid>
        </FormControl>
      </Stack>
    </chakra.form>
  );
};
