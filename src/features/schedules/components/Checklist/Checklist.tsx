import {
  Box,
  Stack,
  Heading,
  List,
  CheckboxGroup,
  ListItem,
  Flex,
  Checkbox,
  IconButton,
  FormControl,
  VisuallyHidden,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoClose, IoAdd } from "react-icons/io5";

import {
  useChecklistsData,
  useCreateChecklistData,
  useDeleteChecklistData,
  useModifyChecklistData,
} from "../../hooks";
import { ChecklistResponse } from "../../types";
import { ChecklistItem } from "../ChecklistItem";

type ChecklistProps = {
  scheduleId: number;
  selectedDateIdx: number;
};

export const Checklist = ({ scheduleId, selectedDateIdx }: ChecklistProps) => {
  const { data: checklistsData } = useChecklistsData({ scheduleId });
  const { mutateAsync: createChecklist } = useCreateChecklistData();
  const { mutateAsync: deleteChecklist } = useDeleteChecklistData();
  const { mutateAsync: modifyChecklist } = useModifyChecklistData();
  const [checklists, setChecklists] = useState<ChecklistResponse[]>([]);
  const [checklistText, setChecklistText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecklistText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { day: selectedDateIdx + 1, title: checklistText };
    const checklistId = await createChecklist({ scheduleId, data });
    const checklist = {
      day: selectedDateIdx + 1,
      content: checklistText,
      id: checklistId,
      checked: false,
    };
    setChecklists((prevChecklists) => [...prevChecklists, checklist]);
    setChecklistText("");
  };

  const onDelete = async (checklistId: number) => {
    setChecklists((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== checklistId)
    );
    await deleteChecklist({ checklistId, scheduleId });
  };

  const onCheck = async (checklistId: number, isChecked: boolean) => {
    setChecklists((prevChecklists) =>
      prevChecklists.map((checklist) => {
        if (checklist.id === checklistId) {
          return { ...checklist, checked: !checklist.checked };
        } else {
          return checklist;
        }
      })
    );
    await modifyChecklist({ checklistId, scheduleId, flag: !isChecked });
  };

  useEffect(() => {
    setChecklists(checklistsData);
  }, [checklistsData]);

  useEffect(() => {
    setChecklists(
      checklistsData.filter(
        (checklist) => checklist.day === selectedDateIdx + 1
      )
    );
  }, [selectedDateIdx, checklistsData]);

  return (
    <Box>
      <Stack bg="gray.50" p="8" spacing="4">
        <Heading size="sm" color="gray.600">
          이 날의 체크리스트
        </Heading>
        <Stack>
          <List color="gray.600" ml="1">
            <CheckboxGroup colorScheme="cyan">
              {checklists.map((checklist, idx) => (
                <ListItem my="1" key={`CheckListItem-${idx}-${checklist.id}`}>
                  <Flex justify="space-between">
                    <Checkbox
                      defaultChecked={checklist.checked}
                      onChange={() => {
                        onCheck(checklist.id, checklist.checked);
                      }}
                    >
                      {checklist.content}
                    </Checkbox>
                    <IconButton
                      aria-label="delete-todo"
                      size="xs"
                      icon={<IoClose />}
                      variant="ghost"
                      mr="3"
                      onClick={() => {
                        onDelete(checklist.id);
                      }}
                    />
                  </Flex>
                </ListItem>
              ))}
            </CheckboxGroup>
          </List>

          <form onSubmit={handleSubmit}>
            <FormControl id="title">
              <VisuallyHidden>
                <FormLabel>입력</FormLabel>
              </VisuallyHidden>
              <InputGroup size="md">
                <Input
                  type="text"
                  size="md"
                  variant="Unstyled"
                  placeholder="할 일을 입력하세요"
                  value={checklistText}
                  onChange={handleInputChange}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    aria-label="add-todo"
                    icon={<IoAdd />}
                    size="xs"
                    type="submit"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
        </Stack>
      </Stack>

      <Divider orientation="horizontal" />

      <Stack bg="gray.50" p="8" spacing="4">
        <Heading size="sm" color="gray.600">
          공통 체크리스트
        </Heading>
        <Stack>
          <List color="gray.600" ml="1">
            <CheckboxGroup colorScheme="cyan">
              {checklists
                .filter((checklist) => checklist.day === 0)
                .map((checklist) => (
                  <ChecklistItem
                    content={checklist.content}
                    checked={checklist.checked}
                  />
                ))}
            </CheckboxGroup>
          </List>

          <form>
            <FormControl id="title">
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
                    type="submit"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
};
