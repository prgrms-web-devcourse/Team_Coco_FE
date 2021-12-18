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
  Divider,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

import {
  useChecklistsData,
  useDeleteChecklistData,
  useModifyChecklistData,
} from "../../hooks";
import { ChecklistForm } from "../ChecklistForm";

type ChecklistProps = {
  scheduleId: number;
  selectedDateIdx: number;
};

export const Checklist = ({ scheduleId, selectedDateIdx }: ChecklistProps) => {
  const { data: checklists } = useChecklistsData({ scheduleId });
  const { mutateAsync: deleteChecklist } = useDeleteChecklistData();
  const { mutateAsync: modifyChecklist } = useModifyChecklistData();

  const onDelete = async (checklistId: number) => {
    await deleteChecklist({ checklistId, scheduleId });
  };

  const onCheck = async (checklistId: number, isChecked: boolean) => {
    await modifyChecklist({ checklistId, scheduleId, flag: !isChecked });
  };

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

          <ChecklistForm
            selectedDateOrder={selectedDateIdx + 1}
            scheduleId={scheduleId}
          />
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

          <ChecklistForm scheduleId={scheduleId} />
        </Stack>
      </Stack>
    </Box>
  );
};
