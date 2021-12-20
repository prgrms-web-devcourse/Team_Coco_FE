import { Button } from "@chakra-ui/react";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

type GoToBackButtonProps = {
  target?: string;
};

export const GoToBackButton = ({ target }: GoToBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <>
      {target ? (
        <Button as={Link} to={target} variant="unstyled">
          <IoChevronBack size={30} />
        </Button>
      ) : (
        <Button onClick={() => navigate(-1)} variant="unstyled">
          <IoChevronBack size={30} />
        </Button>
      )}
    </>
  );
};
