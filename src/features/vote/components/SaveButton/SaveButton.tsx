import { HStack, Button } from "@chakra-ui/react";

export const SaveButton = () => {
  return (
    <HStack w="full" spacing={4}>
      <Button size="lg" flexGrow={1}>
        취소
      </Button>
      <Button
        type="submit"
        size="lg"
        flexGrow={1}
        backgroundColor="cyan.500"
        color="white"
      >
        저장
      </Button>
    </HStack>
  );
};
