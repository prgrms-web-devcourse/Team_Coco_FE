/* eslint-disable array-callback-return */
import { Box, Heading } from "@chakra-ui/react";

import { List } from "./List";
import { ListItem } from "./ListItem";

type Marker = {
  spotId?: number;
  id?: number;
  addressName: string;
  roadAddressName: string;
  phone: string;
  position: { lat: number; lng: number };
  placeName: string;
};

type DailyPlace = Marker & { dateIdx: number; order: number };

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
            .filter((dailyPlace) => dailyPlace.dateIdx === idx + 1)
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
