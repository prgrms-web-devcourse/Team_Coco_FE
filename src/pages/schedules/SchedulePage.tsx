import {
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  VisuallyHidden,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { IoAdd, IoClose, IoChevronForward } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { ScheduleDetail } from "@/features/schedules/components/ScheduleDetail";
export const SchedulePage = () => {
  const scheduleId = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">스케줄 보기</Heading>
        </>
      }
    >
      <Stack my="4">
        <ScheduleDetail />

        <Box>
          <Stack bg="gray.50" p="8" spacing="4">
            <Heading size="sm" color="gray.600">
              이 날의 체크리스트
            </Heading>
            <Stack>
              <List color="gray.600" ml="1">
                <CheckboxGroup colorScheme="cyan">
                  <ListItem my="1">
                    <Flex justify="space-between">
                      <Checkbox>밥먹기1</Checkbox>
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                      />
                    </Flex>
                  </ListItem>
                  <ListItem my="1">
                    <Flex justify="space-between">
                      <Checkbox>밥먹기2</Checkbox>
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                      />
                    </Flex>
                  </ListItem>
                </CheckboxGroup>
              </List>
              <form>
                <FormControl id="search-term">
                  <VisuallyHidden>
                    <FormLabel>입력</FormLabel>
                  </VisuallyHidden>
                  <InputGroup size="md">
                    <Input
                      type="text"
                      size="md"
                      variant="Unstyled"
                      placeholder="할 일을 입력하세요"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        aria-label="add-todo"
                        icon={<IoAdd />}
                        size="xs"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </form>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" />

          <Stack bg="gray.50" px="8" py="8" spacing="4" borderBottomRadius="xl">
            <Heading size="sm" color="gray.600">
              공통 체크리스트
            </Heading>
            <Stack>
              <List color="gray.600" ml="1">
                <CheckboxGroup colorScheme="cyan">
                  <ListItem my="1">
                    <Flex justify="space-between">
                      <Checkbox>밥먹기1</Checkbox>
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                      />
                    </Flex>
                  </ListItem>
                  <ListItem my="1">
                    <Flex justify="space-between">
                      <Checkbox>밥먹기2</Checkbox>
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                      />
                    </Flex>
                  </ListItem>
                </CheckboxGroup>
              </List>

              <form>
                <FormControl id="search-term">
                  <VisuallyHidden>
                    <FormLabel>입력</FormLabel>
                  </VisuallyHidden>
                  <InputGroup size="md">
                    <Input
                      type="text"
                      size="md"
                      variant="Unstyled"
                      placeholder="할 일을 입력하세요"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        aria-label="add-todo"
                        icon={<IoAdd />}
                        size="xs"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </form>
            </Stack>
          </Stack>
        </Box>
        <Flex justifyContent="flex-end">
          <ChakraLink as={Link} to={"/note"} state={scheduleId}>
            <HStack>
              <Text fontSize="lg" color="gray.700">
                메모 및 투표
              </Text>
              <IoChevronForward size="22" color="#2D3748" />
            </HStack>
          </ChakraLink>
        </Flex>
      </Stack>
    </PrivatePageLayout>
  );
};
