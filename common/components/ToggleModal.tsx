"use client";

import React from "react";

import { em, Modal, ModalProps, UnstyledButton } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

export const ToggleModal = ({
  toggler = <span>Toggle Modal</span>,
  content,
  modalProps,
}: {
  toggler: React.ReactNode;
  content: React.ReactNode;
  modalProps?: Omit<ModalProps, "opened" | "onClose">;
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [opened, { toggle, close }] = useDisclosure(false);
  const customModalProps = isMobile
    ? {
        fullScreen: true,
      }
    : {
        size: "70%",
      };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-background p-0 m-0 focus:outline-none focus:border-primary focus:border-2"
      >
        {toggler}
      </button>
      <Modal
        opened={opened}
        onClose={close}
        {...{ ...customModalProps, ...modalProps }}
      >
        {content}
      </Modal>
    </>
  );
};
