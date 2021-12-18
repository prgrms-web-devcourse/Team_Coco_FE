import React from "react";

import { Comment } from "@/features/posts/components";

export type CommentsProps = {
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    nickname: string;
    schedulePostWriter: boolean;
    writerId: number;
  }[];
};

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.commentId} {...comment} />;
      })}
    </>
  );
};
