import NextLink from "next/link";
import { Button, Group } from "@mantine/core";
import React from "react";
import { Id } from "@/features/restaurants";
import dayjs from "dayjs";
import { roundToNextHalfHour } from "@/common/utils";

export const AvailableTimes = ({
  restaurantId,
  times,
}: {
  restaurantId: Id;
  times?: Array<dayjs.Dayjs>;
}) => {
  const now = dayjs()
  const nextTime = roundToNextHalfHour(now.add(1, 'hour'))
  const defaultTimes = [nextTime, nextTime.add(30, 'minute'), nextTime.add(1, 'hour')]

  return (
    <Group mt="md" gap="xs">
      {(times ? times : defaultTimes).map((time,idx) => {
        return (
          <Button
            component={NextLink}
            key={idx}
            variant="light"
            color="blue"
            size="xs"
            href={`/restaurants/${restaurantId}?time=${dayjs(time).format("HH:mm")}`}
          >
            {dayjs(time).format("hh:mm A")}
          </Button>
        );
      })}
    </Group>
  );
};
