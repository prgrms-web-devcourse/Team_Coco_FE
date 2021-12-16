import {
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  AvatarGroup,
  Avatar,
  useDisclosure,
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
import {
  IoEllipsisHorizontal,
  IoAdd,
  IoClose,
  IoChevronForward,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

import { ActionsMenu } from "@/components/ActionsMenu";
import { CustomizedModal } from "@/components/CustomizedModal";
import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { MapContainer } from "@/features/schedules/components/MapContainer";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";

export const SchedulePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Stack my="4" spacing={4}>
        <Flex justify="space-between" align="center">
          <Heading fontSize="2xl" color="gray.700">
            경주 졸업 여행
          </Heading>

          <ActionsMenu icon={<IoEllipsisHorizontal />}>
            <Box>수정</Box>
            <Box color="red.600">삭제</Box>
          </ActionsMenu>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="lg">🍽 🏛 🏯</Text>
          <Text fontSize="md" color="gray.500">
            {"2021-11-02"} ~ {"2021-11-06"}
          </Text>
        </Flex>

        <Heading fontSize="lg" color="gray.700">
          멤버
        </Heading>
        <HStack>
          <AvatarGroup size="md" max={5}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <IoAdd color="718096" />
          <RoundUserAddButton onClick={onOpen} />
          <CustomizedModal
            head="멤버 초대하기"
            isOpen={isOpen}
            onClose={onClose}
          >
            <FriendsList showRole={true} showInvitation={true} />
          </CustomizedModal>
        </HStack>

        <MapContainer setSelectedPlace={() => {}} />

        <Box>
          <DailyCarouselWithInfos />
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
