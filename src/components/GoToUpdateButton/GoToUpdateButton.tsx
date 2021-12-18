import { IconButton, Portal } from "@chakra-ui/react";
import { IoPencilSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

type GoToUpdateButtonProps = {
  target: string;
  scheduleId?: string;
};

export const GoToUpdateButton = ({
  target,
  scheduleId,
}: GoToUpdateButtonProps) => {
  return (
    <Portal>
      <IconButton
        as={Link}
        pos="fixed"
        right="1rem"
        bottom="4.5rem"
        to={`/${target}/update`}
        state={scheduleId}
        aria-label="add-new"
        borderRadius="50%"
        bg="white"
        boxShadow="lg"
        w="80px"
        h="80px"
        icon={<IoPencilSharp size="35" color="#4A5568" />}
      />
    </Portal>
  );
};
