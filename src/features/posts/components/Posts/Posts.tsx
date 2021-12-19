import { VStack } from "@chakra-ui/react";
import React from "react";

import { PostsSimpleResponse } from "../../types";
import { Post } from "../Post";

export type PostsProps = {
  data: PostsSimpleResponse;
};

export const Posts = ({ data }: PostsProps) => {
  return (
    <>
      <VStack spacing={4}>
        {data.map(
          ({ city, startDate, endDate, nickname, postId, themes, title }) => {
            return (
              <Post
                city={city}
                startDate={startDate}
                endDate={endDate}
                nickname={nickname}
                key={postId}
                postId={postId}
                themes={themes}
                title={title}
              />
            );
          }
        )}
      </VStack>
    </>
  );
};
