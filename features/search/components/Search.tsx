"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Box, Button, Flex, NumberInput, Title } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs, { Dayjs } from "dayjs";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";

function toTimeFormat(date: string | Dayjs) {
  return dayjs(date).format("HH:mm");
}

function toDateFormat(date: string | Dayjs) {
  return dayjs(date).toDate();
}

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultDate = searchParams.get("date");
  const defaultTime = decodeURIComponent(searchParams.get("time") ?? "");
  const defaultPeople = searchParams.get("people");

  function submit(formData: FormData) {
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const people = formData.get("people") as string;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    router.push(
      `/restaurants?date=${formattedDate}&time=${time}&people=${people}`
    );
  }

  const now = dayjs();
  const targetHour = 19;

  const nextDefaultHours =
    now.hour() < targetHour
      ? now.hour(targetHour).minute(0).second(0).millisecond(0)
      : now.add(1, "day").hour(targetHour).minute(0).second(0).millisecond(0);

  return (
    <Box>
      <Box mb="xl">
        <Title order={1} mb="xs">
          RESTAURANTS
        </Title>
        <Title order={2} fw={400}>
          Make a free reservation
        </Title>
      </Box>
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
            defaultValue={
              defaultDate
                ? toDateFormat(defaultDate)
                : toDateFormat(nextDefaultHours)
            }
            name="date"
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
            defaultValue={
              defaultTime ? defaultTime : toTimeFormat(nextDefaultHours)
            }
            name="time"
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
            min={1}
            max={8}
            required
            name="people"
            defaultValue={defaultPeople ?? "2"}
          />
          <Button
            className="min-w-[150px]"
            w={{
              base: "100%",
              md: "auto",
            }}
            type="submit"
            formAction={submit}
          >
            Let's go
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
