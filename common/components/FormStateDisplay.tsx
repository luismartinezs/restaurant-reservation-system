import React, { useState } from "react";
import { Text, Alert } from "@mantine/core";
import {
  IoInformationCircle,
  IoCheckmarkCircle,
  IoWarning,
} from "react-icons/io5";
import { ErrorDisplay } from "./ErrorDisplay";

export const FormStateDisplay = ({
  state,
}: {
  state: {
    message?: string;
    type?: string;
    errors?: Record<string, string[] | undefined>;
  };
}) => {
  const { message, type, errors } = state;
  const [show, setShow] = useState(true);

  let icon, color;
  if (type === "error") {
    icon = <IoWarning size={24} />;
    color = "red";
  } else if (type === "success") {
    icon = <IoCheckmarkCircle size={24} />;
    color = "green";
  } else {
    icon = <IoInformationCircle size={24} />;
    color = "blue";
  }

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
