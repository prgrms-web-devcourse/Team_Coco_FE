import {
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  Button,
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
} from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoAdd, IoClose } from "react-icons/io5";

import { CustomizedModal } from "@/components/CustomizedModal";
import { PrivatePageLayout } from "@/components/Layout";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { MapContainer } from "@/features/schedules/components/MapContainer";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";

export const SchedulePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">스케줄 보기</Heading>}
    >
      <Stack my="4" spacing={4}>
        <Flex justify="space-between" align="center">
          <Heading fontSize="xl" color="gray.700">
            경주 졸업 여행
          </Heading>
          <Button variant="ghost">
            <IoEllipsisHorizontal color="gray.700" />
          </Button>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="lg">🍽 🏛 🏯</Text>
          <Text fontSize="md" color="gray.500">
            {"2021-11-02"} ~ {"2021-11-06"}
          </Text>
        </Flex>

        <Heading fontSize="md" color="gray.600">
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
                        bg="gray.100"
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
                        bg="gray.100"
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
                        bg="gray.100"
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
                        bg="gray.100"
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
      </Stack>
    </PrivatePageLayout>
  );
};
