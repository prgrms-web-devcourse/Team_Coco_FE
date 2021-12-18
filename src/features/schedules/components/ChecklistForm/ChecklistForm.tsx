import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

import { useCreateChecklistData } from "../../hooks";
import { ChecklistCreationRequest } from "../../types";

type ChecklistFormProps = {
  scheduleId: number;
  selectedDateOrder?: number;
};

const defaultValues: ChecklistCreationRequest = {
  day: 0,
  title: "",
};

export const ChecklistForm = (props: ChecklistFormProps) => {
  const { selectedDateOrder, scheduleId } = props;
  const { mutateAsync: createChecklist } = useCreateChecklistData();
  const { handleSubmit, register, reset } = useForm<ChecklistCreationRequest>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<ChecklistCreationRequest> = async (data) => {
    const formattedData = {
      day: selectedDateOrder ? selectedDateOrder : 0,
      title: data.title,
    };
    reset();
    await createChecklist({ scheduleId, data: formattedData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="specific">
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
            {...register("title")}
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
  );
};
