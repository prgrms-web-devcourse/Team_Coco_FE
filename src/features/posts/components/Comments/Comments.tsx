import React from "react";

import { Comment } from "@/features/posts/components";

export type CommentsProps = {
  postId: number | null;
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    nickname: string;
    schedulePostWriter: boolean;
    writerId: number;
  }[];
};

export const Comments = ({ comments, postId }: CommentsProps) => {
  return (
    <>
      {comments.map((comment) => {
        return <Comment postId={postId} key={comment.commentId} {...comment} />;
      })}
    </>
  );
};
