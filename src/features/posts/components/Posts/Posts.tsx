import { VStack } from "@chakra-ui/react";
import React from "react";

import { Post } from "../Post";

export const Posts = () => {
  return (
    <>
      <VStack spacing={4}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </VStack>
    </>
  );
};
