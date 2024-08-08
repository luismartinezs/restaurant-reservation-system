import { ButtonProps, Group } from "@mantine/core";
import React from "react";
import { Id } from "@/features/restaurants";
import dayjs from "dayjs";
import { TimeButton } from "./TimeButton";
import isBetween from "dayjs/plugin/isBetween";
import { getNextTime, yieldTimes } from "../utils";

dayjs.extend(isBetween);

export const AvailableTimes = ({
  restaurantId,
  times,
  startTime,
  buttonProps = {},
  timesCount = 3,
}: {
  restaurantId: Id;
  times?: Array<dayjs.Dayjs>;
  startTime?: dayjs.Dayjs;
  buttonProps?: ButtonProps;
  timesCount?: number;
}) => {
  const nextTime = getNextTime(startTime);
  const defaultTimes = [
    ...yieldTimes({
      startTime: nextTime,
      timeInterval: 30,
      timesCount,
    }),
  ];

  return (
    <Group mt="md" gap="xs">
      {(times ? times : defaultTimes).map((time, idx) => {
        return (
          <TimeButton
            key={idx}
            restaurantId={restaurantId}
            time={time}
            buttonProps={buttonProps}
          />
        );
      })}
    </Group>
  );
};
