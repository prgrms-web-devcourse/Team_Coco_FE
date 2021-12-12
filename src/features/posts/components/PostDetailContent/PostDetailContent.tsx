import { Flex, Box, Text, Input } from "@chakra-ui/react";

type PostDetailContentProps = {
  postId: string | undefined;
};

export const PostDetailContent = ({ postId }: PostDetailContentProps) => {
  const post = {
    title: "제목",
    body: "동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세동해 물과 백",
  };

  return (
    <Flex direction="column">
      <Box minHeight="40px">
        <Input
          fontSize="md"
          color="gray.600"
          fontWeight="bold"
          variant="flushed"
          value={post?.title}
          disabled
        />
      </Box>
      <Box marginTop="1rem">
        <Text fontSize="sm" color="gray.500">
          {post?.body}
        </Text>
      </Box>
      <Box height="300px" bgColor="gray.100">
        일정 상세정보 컴포넌트
      </Box>
    </Flex>
  );
};
