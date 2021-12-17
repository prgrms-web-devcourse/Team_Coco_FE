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

type ChecklistProps = {
  scheduleId: number;
  selectedDateIdx: number;
};

export const Checklist = ({ scheduleId, selectedDateIdx }: ChecklistProps) => {
  const { data: checklistsData, isSuccess } = useChecklistsData({ scheduleId });
  const { mutateAsync: createChecklist } = useCreateChecklistData();
  const { mutateAsync: deleteChecklist } = useDeleteChecklistData();
  const { mutateAsync: modifyChecklist } = useModifyChecklistData();
  const [specificChecklists, setSpecificChecklists] = useState<
    ChecklistResponse[]
  >([]);
  const [specificChecklistText, setSpecificChecklistText] = useState("");
  const [commonChecklists, setCommonChecklists] = useState<ChecklistResponse[]>(
    []
  );
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
    const checklist = {
      day,
      content: isSpecific ? specificChecklistText : commonChecklistText,
      id: checklistId,
      checked: false,
    };

    if (isSpecific) {
      setSpecificChecklists((prevChecklists) => [...prevChecklists, checklist]);
      setSpecificChecklistText("");
    } else {
      setCommonChecklists((prevChecklists) => [...prevChecklists, checklist]);
      setCommonChecklistText("");
    }
  };

  const onDelete = async (checklistId: number) => {
    setSpecificChecklists((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== checklistId)
    );
    await deleteChecklist({ checklistId, scheduleId });
  };

  const onCheck = async (checklistId: number, isChecked: boolean) => {
    setSpecificChecklists((prevChecklists) =>
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
    setSpecificChecklists(
      checklistsData.filter(
        (checklist) => checklist.day === selectedDateIdx + 1
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, selectedDateIdx]);

  useEffect(() => {
    setCommonChecklists(
      checklistsData.filter((checklist) => checklist.day === 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Box>
      <Stack bg="gray.50" p="8" spacing="4">
        <Heading size="sm" color="gray.600">
          이 날의 체크리스트
        </Heading>
        <Stack>
          <List color="gray.600" ml="1">
            <CheckboxGroup colorScheme="cyan">
              {specificChecklists.map((checklist, idx) => (
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
              {commonChecklists
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
