import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as yup from "yup";

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

const schema = yup.object().shape({
  day: yup.number().required().min(0).max(7),
  title: yup.string().required().min(1).max(16),
});

export const ChecklistForm = (props: ChecklistFormProps) => {
  const { selectedDateOrder, scheduleId } = props;
  const { mutateAsync: createChecklist } = useCreateChecklistData();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChecklistCreationRequest>({
    defaultValues,
    resolver: yupResolver(schema),
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
      <FormControl isInvalid={Boolean(errors.title)}>
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

        <FormErrorMessage ml="2">
          {errors.title && "1 ~ 16자 사이로 입력해 주세요"}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};
