import {
  HStack,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import * as yup from "yup";

import { useCreateCommentData } from "@/features/posts/hooks";

const schema = yup.object().shape({
  comment: yup.string().min(1).max(255).required(),
});

type FormValues = {
  comment: string;
};

export type AddCommentFormProps = {
  postId: number | null;
  nickname: string;
};

export const AddCommentForm = ({ postId, nickname }: AddCommentFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: createComment } = useCreateCommentData();

  const onSubmit: SubmitHandler<FormValues> = async ({ comment }) => {
    await createComment({ postId, data: { content: comment } });
    reset({ comment: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <Avatar size="sm" name={nickname} />
        <InputGroup size="sm">
          <Input
            placeholder="댓글을 입력하세요"
            {...register("comment")}
            isInvalid={Boolean(errors.comment)}
          />
          ;
          <InputRightElement
            children={
              <IconButton
                type="submit"
                aria-label="comment"
                icon={<IoSendSharp />}
                size="sm"
                isRound
                variant="unstyle"
                isLoading={isSubmitting}
              />
            }
          />
        </InputGroup>
      </HStack>
    </form>
  );
};
