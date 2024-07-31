import React from 'react';
import { Alert, Stack } from '@mantine/core';
import { CiCircleAlert } from "react-icons/ci";

export const ErrorDisplay = ({ errors }:
  {
    errors?: Record<string, string[] | undefined>;
  }
) => {
  if (!errors) return null;

  const errorEntries = Object.entries(errors).filter(([_, value]) => value && value.length > 0);

  if (errorEntries.length === 0) return null;

  return (
    <Stack gap="xs">
      {errorEntries.map(([key, messages]) => (
        <Alert key={key} title={`Error in ${key}`} color="red" radius="md" icon={<CiCircleAlert size={20} />}>
          {messages?.join(", ")}
        </Alert>
      ))}
    </Stack>
  );
};