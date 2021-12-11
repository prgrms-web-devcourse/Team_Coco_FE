import { Button } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const GoToBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="unstyled">
      <IoChevronBack size={30} />
    </Button>
  );
};
