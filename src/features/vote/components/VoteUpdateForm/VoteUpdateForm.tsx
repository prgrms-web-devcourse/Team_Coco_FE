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
      <VStack marginTop={4} spacing={4}>
        <FormControl id="title">
          <Input placeholder="제목을 입력하세요" />
        </FormControl>
        <FormControl>
          <Flex>
            <Spacer />
            <Checkbox color="#718096">중복 투표 가능</Checkbox>
          </Flex>
        </FormControl>
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
        <TextWithIcon
          w="full"
          icon={<IoAddSharp />}
          onClick={() => {
            console.log("추가추가");
          }}
        >
          항목 추가
        </TextWithIcon>
      </VStack>
    </form>
  );
};
