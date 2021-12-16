import { Text } from "@chakra-ui/react";
import React from "react";

type MemoThumbnailProps = {
  title?: string;
  content?: string;
};

export const MemoThumbnail = ({ title, content }: MemoThumbnailProps) => {
  return (
    <>
      <Text fontSize="md" color="gray.600" isTruncated>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" noOfLines={8}>
        {content}
      </Text>
    </>
  );
};
