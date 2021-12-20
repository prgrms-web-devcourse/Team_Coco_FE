import { Button } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type GoToBackButtonProps = {
  target?: string;
};

export const GoToBackButton = ({ target }: GoToBackButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    target ? navigate(target) : navigate(-1);
  };

  return (
    <Button onClick={() => handleNavigate()} variant="unstyled">
      <IoChevronBack size={30} />
    </Button>
  );
};
