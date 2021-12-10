import {
  VStack,
  HStack,
  FormControl,
  Input,
  Checkbox,
  Flex,
  Spacer,
  Box,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoCloseSharp, IoAddSharp } from "react-icons/io5";

import { TextWithIcon } from "@/components/TextWithIcon";

export const VoteUpdateForm = () => {
  const [options, setOptions] = useState([
    { id: 0, content: "" },
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
  ]);

  return (
    <form>
      <Stack marginTop={4} spacing={4} height="550px">
        <FormControl id="title">
          <Input placeholder="제목을 입력하세요" variant="flushed" />
        </FormControl>
        <FormControl>
          <Flex>
            <Spacer />
            <Checkbox color="#718096">중복 투표 가능</Checkbox>
          </Flex>
        </FormControl>
        <Box flexGrow={1}>
          <FormControl id="option">
            <Stack direction="column">
              {options.map((option) => (
                <HStack position="relative" key={option.id}>
                  <Input placeholder="항목을 입력하세요" color="#71809" />
                  <Box position="absolute" right={4}>
                    <IoCloseSharp color="#757575" onClick={() => {}} />
                  </Box>
                </HStack>
              ))}
            </Stack>
          </FormControl>
          <TextWithIcon w="full" marginTop={4} icon={<IoAddSharp />}>
            항목 추가
          </TextWithIcon>
        </Box>
        <Button type="submit" size="lg" color="white" bg="cyan.600" isFullWidth>
          투표 만들기
        </Button>
      </Stack>
    </form>
  );
};
