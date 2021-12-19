import {
  Select,
  SelectProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import type { GetPostsDTO } from "@/features/posts/hooks";

const sortByOptions = {
  defaultValue: "",
  options: ["최신순", "조회순", "좋아요순", "댓글순"],
};

export type SortBySelectProps = {
  setSearchState: Dispatch<SetStateAction<GetPostsDTO>>;
} & SelectProps;

export const SortBySelect = ({
  setSearchState,
  ...selectProps
}: SortBySelectProps) => {
  return (
    <Select
      aria-label="Sort by"
      defaultValue={sortByOptions.defaultValue}
      focusBorderColor={mode("blue.500", "blue.200")}
      variant="unstyled"
      onChange={(event) => {
        setSearchState((prevState) => ({
          ...prevState,
          sorting: event.target.value as "최신순",
        }));
      }}
      {...selectProps}
    >
      {sortByOptions.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
