import React, { useState } from "react";
import { Text, Alert } from "@mantine/core";
import {
  IoInformationCircle,
  IoCheckmarkCircle,
  IoWarning,
} from "react-icons/io5";
import { ErrorDisplay } from "./ErrorDisplay";
import { ActionResponseState } from "@/features/reservations/actions";

function getAttrs(type: string) {
  switch (type) {
    case "error":
      return {
        icon: <IoWarning size={24} />,
        color: "red",
      };
    case "success":
      return {
        icon: <IoCheckmarkCircle size={24} />,
        color: "green",
      };
    default:
      return {
        icon: <IoInformationCircle size={24} />,
        color: "blue",
      };
  }
}

export const FormStateDisplay = ({ state }: { state: ActionResponseState }) => {
  const { message, type, errors } = state;
  const { icon, color } = getAttrs(type);
  const [show, setShow] = useState(true);

  return (
    <>
      {message && show && (
        <Alert
          icon={icon}
          color={color}
          radius="md"
          role="status"
          aria-live="polite"
          withCloseButton
          onClose={() => setShow(false)}
        >
          <Text>{message}</Text>
        </Alert>
      )}
      <ErrorDisplay errors={errors} />
    </>
  );
};
