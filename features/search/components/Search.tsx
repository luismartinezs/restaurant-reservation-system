"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Flex,
  MantineSize,
  NumberInput,
  Skeleton,
  Title,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";

import { useSearchQuery } from "../hooks/useSearchQuery";
import { useChangeSearchParams } from "@/common/hooks/useChangeSearchParams";
import {
  MAX_DATE_RANGE,
  MAX_PEOPLE,
  MAX_TIME,
  MIN_PEOPLE,
  MIN_TIME,
} from "@/features/reservations/constants";
import { cn } from "@/common/utils";

const searchButtonSizeClass = {
  xs: "h-[34px]",
  sm: "h-[36px]",
  md: "h-[42px]",
  lg: "h-[48px]",
  xl: "h-[54px]",
};

export function Search({
  title,
  size = "sm",
  isMagicButton,
}: {
  title?: string;
  size?: MantineSize;
  isMagicButton?: boolean;
}) {
  const search = useSearchQuery();
  const router = useRouter();
  const { update } = useChangeSearchParams();

  function submit(formData: FormData) {
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const people = formData.get("people") as string;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    router.push(
      `/restaurants?${update({
        date: formattedDate,
        time,
        people,
      })}`
    );
    router.refresh();
  }

  return (
    <Box>
      {title && (
        <Box mb="xl">
          <Title order={2} fw={400}>
            {title}
          </Title>
        </Box>
      )}
      <form>
        <Flex
          align="center"
          mb="md"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "sm", md: "lg" }}
          justify={{ md: "center" }}
        >
          <DatePickerInput
            flex={1}
            w={{
              base: "100%",
              md: "auto",
            }}
            aria-label="Date"
            placeholder="Pick a date"
            leftSection={<CiCalendar size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            defaultValue={dayjs(search.date).toDate()}
            name="date"
            size={size}
            minDate={dayjs().toDate()}
            maxDate={dayjs().add(MAX_DATE_RANGE, "month").toDate()}
          />
          <TimeInput
            w={{
              base: "100%",
              md: "auto",
            }}
            flex={1}
            aria-label="Time"
            placeholder="Select time"
            leftSection={<CiClock1 size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            defaultValue={search.time}
            name="time"
            size={size}
            minTime={MIN_TIME}
            maxTime={MAX_TIME}
          />
          <NumberInput
            w={{
              base: "100%",
              md: "auto",
            }}
            flex={1}
            aria-label="People"
            placeholder="Select number of people"
            leftSection={<CiUser size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            name="people"
            defaultValue={search.people}
            size={size}
            min={MIN_PEOPLE}
            max={MAX_PEOPLE}
          />
          {isMagicButton ? (
            <button
              className={cn(
                "w-full md:w-auto text-white",
                searchButtonSizeClass[size],
                isMagicButton && "magic-button"
              )}
              type="submit"
              formAction={submit}
            >
              Let&apos;s go
            </button>
          ) : (
            <Button
              type="submit"
              formAction={submit}
              size={size}
              className="min-w-[150px]"
            >
              Let&apos;s go
            </Button>
          )}
        </Flex>
      </form>
    </Box>
  );
}

export function SearchSkeleton() {
  return <Skeleton mb="xl" w="100%" h={36} />;
}
