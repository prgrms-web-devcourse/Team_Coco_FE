import { VStack } from "@chakra-ui/react";
import React from "react";

import { PostResponse } from "../../types";
import { Post } from "../Post";

export type PostsProps = {
  data: PostResponse[];
};

export const Posts = ({ data }: PostsProps) => {
  return (
    <>
      <VStack spacing={4}>
        {data.map((post) => {
          return <Post />;
        })}
      </VStack>
    </>
  );
};
