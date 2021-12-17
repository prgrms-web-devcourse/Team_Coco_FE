import {
  Select,
  SelectProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import type { GetPostsDTO } from "@/features/posts/hooks";

const sortByOptions = {
  defaultValue: "",
  options: [
    { label: "최신순", value: "new" },
    { label: "조회순", value: "views" },
    { label: "좋아요순", value: "likes" },
    { label: "댓글순", value: "comments" },
  ],
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
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
