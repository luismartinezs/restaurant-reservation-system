"use client";

import { User } from "@supabase/supabase-js";
import { useFormState } from "react-dom";
import { Title, NumberInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";

import { Id } from "@/features/restaurants";
import { SubmitButton } from "@/common/components/SubmitButton";

import { ActionResponseState, createReservation } from "../actions";
import { FormStateDisplay } from "@/common/components/FormStateDisplay";
import { useSearchQuery } from "@/features/search";
import {
  MAX_DATE_RANGE,
  MAX_PEOPLE,
  MAX_TIME,
  MIN_PEOPLE,
  MIN_TIME,
} from "../constants";

const initialState: ActionResponseState = {
  message: null,
  type: "idle",
  errors: undefined,
  key: 1,
};

export const CreateReservationForm = ({
  restaurantId,
  userId,
}: {
  restaurantId: Id;
  userId: User["id"];
}) => {
  const query = useSearchQuery();
  const bookWithIds = createReservation.bind(null, {
    restaurantId,
    userId,
  });
  const [state, formAction] = useFormState(bookWithIds, initialState);

  return (
    <div>
      <Title order={2} mb="md">
        Make a reservation
      </Title>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
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
            name="date"
            minDate={dayjs().toDate()}
            maxDate={dayjs().add(MAX_DATE_RANGE, "month").toDate()}
            defaultValue={dayjs(query.date).toDate()}
          />
          <TimeInput
            w={{
              base: "100%",
              md: "auto",
            }}
            flex={1}
            data-testid="time-input"
            aria-label="Time"
            placeholder="Select time"
            leftSection={<CiClock1 size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            name="time"
            defaultValue={query.time}
            minTime={MIN_TIME}
            maxTime={MAX_TIME}
            key={query.time}
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
            min={MIN_PEOPLE}
            max={MAX_PEOPLE}
            required
            name="people"
            defaultValue={query?.people}
          />
          <SubmitButton
            onClick={(e) => {
              e.currentTarget.form?.requestSubmit();
            }}
          >
            Book now
          </SubmitButton>
        </div>
        <FormStateDisplay state={state} key={state.key} />
      </form>
    </div>
  );
};
