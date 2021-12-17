/* eslint-disable array-callback-return */
import { Box, Heading } from "@chakra-ui/react";

import { DailyPlace } from "../../types";

import { List } from "./List";
import { ListItem } from "./ListItem";

type ListWithVerticalLineProps = {
  idx: number;
  dailyPlaces: DailyPlace[];
  className?: string;
};

export const ListWithVerticalLine = (props: ListWithVerticalLineProps) => {
  const { idx, dailyPlaces, className } = props;

  return (
    <Box as="section" className={className}>
      <Heading size="sm" mx="2" color="cyan.500">
        day{idx + 1}
      </Heading>
      <Box maxW="2xl" mx="auto" p={{ base: "4", md: "8" }}>
        <List spacing="4">
          {dailyPlaces
            .filter((dailyPlace) => dailyPlace.dateOrder === idx + 1)
            .map((dailyPlace, _idx) => {
              return (
                <ListItem
                  key={`ListItem-${_idx}`}
                  title={dailyPlace.placeName}
                  address={dailyPlace.addressName}
                  phone={dailyPlace.phone}
                />
              );
            })}
        </List>
      </Box>
    </Box>
  );
};
