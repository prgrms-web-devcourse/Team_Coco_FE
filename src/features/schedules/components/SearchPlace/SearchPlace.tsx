import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { VisuallyHidden, Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import { Marker } from "../../types";
import { MapContainer } from "../MapContainer";

type SearchPlaceProps = {
  setSelectedPlace: (value?: Marker) => void;
};

export const SearchPlace = ({ setSelectedPlace }: SearchPlaceProps) => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <Stack spacing={8}>
      <FormControl>
        <VisuallyHidden>
          <FormLabel>장소 검색</FormLabel>
        </VisuallyHidden>
        <InputGroup w="full">
          <Input
            placeholder="장소를 검색하세요"
            onChange={handleInputChange}
            value={inputText}
          />
          <InputRightAddon
            p="0"
            children={
              <Button type="button" onClick={handleClick}>
                검색
              </Button>
            }
          />
        </InputGroup>
      </FormControl>
      <MapContainer searchPlace={place} setSelectedPlace={setSelectedPlace} />
    </Stack>
  );
};
