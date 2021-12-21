import { VStack, Text, Input, Flex } from "@chakra-ui/react";
import { useState } from "react";

import { PostLikeButton } from "@/features/posts/components/PostLikeButton";
import type { DailyScheduleSpotResponse } from "@/features/posts/types";
import { Carousel } from "@/features/schedules/components/Carousel";
import { Dailys } from "@/features/schedules/components/Dailys";
import { getTotalDays } from "@/utils/date";

type PostDetailContentProps = {
  title: string;
  content: string;
  dailyPlaces: DailyScheduleSpotResponse[];
  views: number;
  isLiked: boolean;
  likeCount: number;
  postId: number | null;
  startDate: string;
  endDate: string;
};

export const PostDetailContent = ({
  title,
  content,
  dailyPlaces,
  views,
  isLiked,
  likeCount,
  postId,
  startDate,
  endDate,
}: PostDetailContentProps) => {
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);

  const totalDays = getTotalDays(new Date(endDate), new Date(startDate));

  return (
    <VStack spacing={4} align="stretch">
      <Input
        fontSize="md"
        color="gray.600"
        fontWeight="bold"
        variant="flushed"
        value={title}
        disabled
      />
      <Carousel perViewInfo={{ base: 2 }}>
        <Dailys
          totalDays={totalDays}
          selectedDateIdx={selectedDateIdx}
          setSelectedDateIdx={setSelectedDateIdx}
          dailyPlaces={dailyPlaces}
          className="keen-slider__slide"
        />
      </Carousel>
      <Text fontSize="sm" color="gray.500" sx={{ whiteSpace: "pre-line" }}>
        {content}
      </Text>
      <Flex justifyContent="space-between">
        <PostLikeButton
          likeCount={likeCount}
          isLiked={isLiked}
          postId={postId}
        />
        <Text fontSize="sm" color="gray.500">
          {views}명이 봤어요
        </Text>
      </Flex>
    </VStack>
  );
};
