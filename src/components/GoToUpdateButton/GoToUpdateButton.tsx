import { IconButton } from "@chakra-ui/react";
import { IoPencilSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

type GoToUpdateButtonProps = {
  target: string;
};

export const GoToUpdateButton = ({ target }: GoToUpdateButtonProps) => {
  return (
    <IconButton
      as={Link}
      to={`/${target}/update`}
      aria-label="add-new"
      borderRadius="50%"
      bg="white"
      boxShadow="lg"
      w="80px"
      h="80px"
      icon={<IoPencilSharp size="35" color="#4A5568" />}
    />
  );
};