"use client";

import { User } from "@supabase/supabase-js";
import { useFormState } from "react-dom";
import { Title, NumberInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";

import { Id } from "@/features/restaurants";
import { getSearchQuery } from "@/features/search";
import { SubmitButton } from "@/common/components/SubmitButton";

import { book } from "../actions";
import { Update } from "../types";
import { FormStateDisplay } from "@/common/components/FormStateDisplay";

const initialState = {
  message: "",
  type: "",
  errors: undefined,
  key: 1
};

export const BookForm = ({
  restaurantId,
  reservationId,
  userId,
  initialData,
}: {
  restaurantId: Id;
  reservationId?: Id;
  userId: User["id"];
  initialData?: Update;
}) => {
  const isEdit = !!reservationId;
  const query = getSearchQuery();
  const bookWithIds = book.bind(null, { restaurantId, userId, reservationId });
  const [state, formAction] = useFormState(bookWithIds, initialState);

  return (
    <div>
      <Title order={2} mb="md">
        {isEdit ? "Change your reservation" : "Make a reservation"}
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
            maxDate={dayjs().add(2, "month").toDate()}
            defaultValue={
              isEdit
                ? dayjs(initialData?.start).toDate()
                : dayjs(query.date).toDate()
            }
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
            name="time"
            defaultValue={
              isEdit ? dayjs(initialData?.start).format("HH:mm") : query.time
            }
            minTime="13:00"
            maxTime="22:00"
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
            defaultValue={isEdit ? initialData?.people : query.people}
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
