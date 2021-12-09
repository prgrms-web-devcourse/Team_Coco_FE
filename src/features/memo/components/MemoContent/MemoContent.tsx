import { Flex, Box, Text } from "@chakra-ui/react";
import { IoBodyOutline } from "react-icons/io5";

type MemoContentType = {
  memo: { userId: number; id: number; title: string; body: string } | undefined;
};

export const MemoContent = ({ memo }: MemoContentType) => {
  // const { title, body } = memo;

  return (
    <Flex direction="column">
      <Box minHeight="40px" borderBottom="1px solid #E2E8F0">
        <Text fontSize="md" color="gray.600">
          {memo && memo.title}
        </Text>
      </Box>
      <Box marginTop="1rem">
        <Text fontSize="sm" color="gray.500">
          {memo && memo.body}
        </Text>
      </Box>
    </Flex>
  );
};

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan
//           lectus in nibh viverra, id consequat tortor gravida. Donec accumsan
//           dapibus velit sed hendrerit. Ut tincidunt urna velit, vitae posuere
//           est pretium a. Morbi ac porta lorem. Sed iaculis, tortor ut maximus
//           aliquet, tellus risus ultricies tellus, id sodales sapien tortor eu
//           tortor. Sed id maximus velit. Cras imperdiet nunc malesuada aliquet
//           posuere. Mauris quis eleifend lacus. Sed semper volutpat massa in
//           facilisis. Suspendisse quis consequat nisl. Quisque venenatis ut augue
//           eget molestie. Fusce nec nunc placerat, ultrices justo hendrerit,
//           pellentesque magna. Morbi iaculis augue et porttitor dignissim. Nam
//           gravie enim ornare nec. Donec dapibus nunc vitae velit hendr
