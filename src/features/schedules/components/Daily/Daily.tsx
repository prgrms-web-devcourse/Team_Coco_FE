/* eslint-disable array-callback-return */
import {
  Box,
  Heading,
  Stack,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

type DailyPlace = {
  dateIdx: number;
  placeName: string;
  spotId: string;
};

type DailyProps = {
  idx: number;
  dailyPlaces: DailyPlace[];
  focus?: boolean;
  onClick?: (idx: number) => void;
  className?: string;
  onDelete?: (idx: number) => void;
  setSelectedPlaceIdx?: (idx: number) => void;
};

export const Daily = (props: DailyProps) => {
  const { idx, focus, onClick, dailyPlaces, className, onDelete } = props;

  return (
    <Box
      bg={focus ? "gray.100" : "gray.50"}
      minW="108"
      minH="160"
      py={4}
      pb={8}
      borderRadius="md"
      onClick={() => {
        onClick?.(idx);
      }}
      className={className}
    >
      <Stack spacing={4}>
        <Heading size="sm" px={2} color={focus ? "cyan.500" : "gray.400"}>
          day{idx + 1}
        </Heading>
        <Stack spacing={2}>
          {dailyPlaces.map((dailyPlace, dailyPlaceIdx) => {
            if (dailyPlace.dateIdx === idx) {
              return (
                <HStack
                  key={`Daily-${dailyPlaceIdx}-${dailyPlace.spotId}`}
                  bg={focus ? "gray.200" : "gray.100"}
                  p={2}
                  justify={onDelete ? "space-between" : "center"}
                >
                  <Text fontSize="sm" color={focus ? "gray.900" : "gray.500"}>
                    {dailyPlace.placeName}
                  </Text>
                  {onDelete && (
                    <IconButton
                      aria-label="delete-place"
                      size="xs"
                      icon={<IoClose />}
                      variant="ghost"
                      mr="3"
                      color={focus ? "gray.500" : "gray.400"}
                      onClick={() => onDelete(dailyPlaceIdx)}
                    />
                  )}
                </HStack>
              );
            }
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
