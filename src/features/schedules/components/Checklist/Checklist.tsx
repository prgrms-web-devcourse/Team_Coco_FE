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
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { IoClose, IoAdd } from "react-icons/io5";

import {
  useChecklistsData,
  useCreateChecklistData,
  useDeleteChecklistData,
  useModifyChecklistData,
} from "../../hooks";
import { ChecklistResponse } from "../../types";

type ChecklistProps = {
  scheduleId: number;
  selectedDateIdx: number;
};

export const Checklist = ({ scheduleId, selectedDateIdx }: ChecklistProps) => {
  const { data: checklists } = useChecklistsData({ scheduleId });
  const { mutateAsync: createChecklist } = useCreateChecklistData();
  const { mutateAsync: deleteChecklist } = useDeleteChecklistData();
  const { mutateAsync: modifyChecklist } = useModifyChecklistData();
  const [specificChecklistText, setSpecificChecklistText] = useState("");
  const [commonChecklistText, setCommonChecklistText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSpecific = (e.target as HTMLInputElement).form?.id === "specific";
    isSpecific
      ? setSpecificChecklistText(e.target.value)
      : setCommonChecklistText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSpecific = (e.target as Element).id === "specific";
    const day = isSpecific ? selectedDateIdx + 1 : 0;

    const data = { day, title: specificChecklistText };
    const checklistId = await createChecklist({ scheduleId, data });
    console.log(checklistId);

    if (isSpecific) {
      setSpecificChecklistText("");
    } else {
      setCommonChecklistText("");
    }
  };

  const onDelete = async (checklistId: number) => {
    await deleteChecklist({ checklistId, scheduleId });
  };

  const onCheck = async (checklistId: number, isChecked: boolean) => {
    await modifyChecklist({ checklistId, scheduleId, flag: !isChecked });
  };

  useEffect(() => {
    console.log(checklists);
  }, [checklists]);

  return (
    <Box>
      <Stack bg="gray.50" p="8" spacing="4">
        <Heading size="sm" color="gray.600">
          이 날의 체크리스트
        </Heading>
        <Stack>
          <List color="gray.600" ml="1">
            <CheckboxGroup colorScheme="cyan">
              {checklists
                .filter((checklist) => checklist.day === selectedDateIdx + 1)
                .map((checklist, idx) => (
                  <ListItem my="1" key={`CheckListItem-${idx}`}>
                    <Flex justify="space-between" align="center">
                      <input
                        id={`cb-${checklist.id}`}
                        type="checkbox"
                        value={checklist.id}
                        checked={checklist.checked}
                        onChange={() => {
                          onCheck(checklist.id, checklist.checked);
                        }}
                        style={{ marginTop: 4 }}
                      />
                      <label htmlFor={`cb-${checklist.id}`}>
                        {checklist.content}
                      </label>

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

          <form onSubmit={handleSubmit} id="specific">
            <FormControl>
              <VisuallyHidden>
                <FormLabel>입력</FormLabel>
              </VisuallyHidden>
              <InputGroup size="md">
                <Input
                  type="text"
                  size="md"
                  variant="Unstyled"
                  placeholder="할 일을 입력하세요"
                  value={specificChecklistText}
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
                .map((checklist, idx) => (
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

          <form onSubmit={handleSubmit} id="common">
            <FormControl>
              <VisuallyHidden>
                <FormLabel>입력</FormLabel>
              </VisuallyHidden>
              <InputGroup size="md">
                <Input
                  type="text"
                  size="md"
                  variant="Unstyled"
                  placeholder="할 일을 입력하세요"
                  value={commonChecklistText}
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
    </Box>
  );
};
