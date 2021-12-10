import { Box, Heading, Stack, Text } from "@chakra-ui/react";

type DailyPlace = {
  date: number;
  placeName: string;
  spotId: string;
};

type DailyProps = {
  idx: number;
  focus: boolean;
  onClick: (idx: number) => void;
  dailyPlaces: DailyPlace[];
};

export const Daily = ({ idx, focus, onClick, dailyPlaces }: DailyProps) => {
  return (
    <Box
      bg={focus ? "gray.100" : "gray.50"}
      minW="108"
      minH="160"
      py={4}
      borderRadius="md"
      onClick={() => {
        onClick(idx);
      }}
    >
      <Stack spacing={4}>
        <Heading size="sm" px={2} color={focus ? "cyan.500" : "gray.400"}>
          day{idx + 1}
        </Heading>
        <Stack spacing={2}>
          {dailyPlaces.map((dailyPlace, _idx) => {
            if (dailyPlace.date === idx) {
              return (
                <Box
                  key={dailyPlace.spotId + _idx}
                  bg={focus ? "gray.200" : "gray.100"}
                  p={2}
                  textAlign="center"
                >
                  <Text fontSize="sm" color={focus ? "gray.900" : "gray.500"}>
                    {dailyPlace.placeName}
                  </Text>
                </Box>
              );
            }
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
