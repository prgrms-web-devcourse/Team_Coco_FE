import { Text } from "@chakra-ui/react";
import React from "react";

type MemoThumbnailProps = {
  title?: string;
  body?: string;
};

export const MemoThumbnail = (props: MemoThumbnailProps) => {
  const { title, body } = props;

  return (
    <>
      <Text fontSize="md" color="gray.600" isTruncated>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" noOfLines={8}>
        {body}
      </Text>
    </>
  );
};
