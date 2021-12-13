import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

type CustomizedModalProps = PropsWithChildren<{
  head: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}>;

export const CustomizedModal = ({
  head,
  isOpen,
  onClose,
  children,
}: CustomizedModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xs">
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{head}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
