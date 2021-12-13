import {
  Select,
  SelectProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";

const sortByOptions = {
  defaultValue: "",
  options: [
    { label: "최신순", value: "new" },
    { label: "조회순", value: "views" },
    { label: "좋아요순", value: "likes" },
    { label: "댓글순", value: "comments" },
  ],
};

export const SortBySelect = (props: SelectProps) => {
  return (
    <Select
      aria-label="Sort by"
      defaultValue={sortByOptions.defaultValue}
      focusBorderColor={mode("blue.500", "blue.200")}
      variant="unstyled"
      {...props}
    >
      {sortByOptions.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
