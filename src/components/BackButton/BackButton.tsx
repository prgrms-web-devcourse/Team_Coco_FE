import { Box } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(-1)}>
      <IoChevronBack size="30px" />
    </Box>
  );
};
