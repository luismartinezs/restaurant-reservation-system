import NextLink from "next/link";
import { Button, ButtonProps, Group } from "@mantine/core";
import React from "react";
import { Id } from "@/features/restaurants";
import dayjs from "dayjs";
import { roundToNextHalfHour } from "@/common/utils";

function* yieldTimes(
  startTime: dayjs.Dayjs,
  timeInterval: number,
  timesCount: number
) {
  for (let i = 0; i < timesCount; i++) {
    yield startTime.add(i * timeInterval, "minute");
  }
}

export const AvailableTimes = ({
  restaurantId,
  times,
  buttonProps = {},
  timesCount = 3,
}: {
  restaurantId: Id;
  times?: Array<dayjs.Dayjs>;
  buttonProps?: ButtonProps;
  timesCount?: number;
}) => {
  const now = dayjs();
  const nextTime = roundToNextHalfHour(now.add(1, "hour"));
  const defaultTimes = [...yieldTimes(nextTime, 30, timesCount)];

  return (
    <Group mt="md" gap="xs">
      {(times ? times : defaultTimes).map((time, idx) => {
        return (
          <Button
            component={NextLink}
            key={idx}
            variant="light"
            color="blue"
            size="xs"
            href={`/restaurants/${restaurantId}?time=${dayjs(time).format(
              "HH:mm"
            )}`}
            {...buttonProps}
          >
            {dayjs(time).format("hh:mm A")}
          </Button>
        );
      })}
    </Group>
  );
};
