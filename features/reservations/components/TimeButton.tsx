import Link from "next/link";
import { Button } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";

export const TimeButton = ({
  restaurantId,
  time,
  buttonProps,
  disabled
}: {
  restaurantId: number;
  time: Date | dayjs.Dayjs;
  buttonProps?: any;
  disabled?: boolean;
}) => {
  return (
    <Button
      component={Link}
      variant="light"
      color="blue"
      size="xs"
      href={`/restaurants/${restaurantId}?time=${dayjs(time).format("HH:mm")}`}
      disabled={disabled}
      {...buttonProps}
    >
      {dayjs(time).format("hh:mm A")}
    </Button>
  );
};
