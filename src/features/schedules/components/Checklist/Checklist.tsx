import {
  Box,
  Stack,
  Heading,
  List,
  CheckboxGroup,
  ListItem,
  Flex,
  IconButton,
  Divider,
  Skeleton,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

import {
  useChecklistsData,
  useDeleteChecklistData,
  useModifyChecklistData,
} from "../../hooks";
import { ChecklistForm } from "../ChecklistForm";
import { CustomCheckbox } from "../CustomCheckBox";

type ChecklistProps = {
  scheduleId: number;
  selectedDateOrder: number;
};

export const Checklist = (props: ChecklistProps) => {
  const { scheduleId, selectedDateOrder } = props;
  const { data: checklists, isLoading } = useChecklistsData({ scheduleId });
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
          <List ml="1" color="gray.500">
            <CheckboxGroup colorScheme="cyan">
              {isLoading && (
                <Stack my="1" spacing={2}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              )}
              {checklists
                .filter((checklist) => checklist.day === selectedDateOrder)
                .map((checklist, idx) => (
                  <ListItem my="1" key={`CheckListItem-${idx}`}>
                    <Flex justify="space-between" align="center">
                      <CustomCheckbox
                        checklist={checklist}
                        onChange={() => {
                          onCheck(checklist.id, checklist.checked);
                        }}
                      />
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                        disabled={!Boolean(checklist.id)}
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
            selectedDateOrder={selectedDateOrder}
            scheduleId={scheduleId}
          />
        </Stack>
      </Stack>

      <Divider orientation="horizontal" />

      <Stack bg="gray.50" p="8" spacing="4" borderBottomRadius="2xl" mb="4">
        <Heading size="sm" color="gray.600">
          공통 체크리스트
        </Heading>
        <Stack>
          <List color="gray.500" ml="1">
            <CheckboxGroup colorScheme="cyan">
              {isLoading && (
                <Stack my="1" spacing={2}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              )}
              {checklists
                .filter((checklist) => checklist.day === 0)
                .map((checklist, idx) => (
                  <ListItem my="1" key={`CheckListItem-${idx}`}>
                    <Flex justify="space-between" align="center">
                      <CustomCheckbox
                        checklist={checklist}
                        onChange={() => {
                          onCheck(checklist.id, checklist.checked);
                        }}
                      />
                      <IconButton
                        aria-label="delete-todo"
                        size="xs"
                        icon={<IoClose />}
                        variant="ghost"
                        mr="3"
                        disabled={!Boolean(checklist.id)}
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
