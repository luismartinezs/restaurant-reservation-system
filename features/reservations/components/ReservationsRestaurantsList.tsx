import React from "react";
import { api } from "../server";
import { Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ReservationsRestaurantsItem } from "./ReservationsRestaurantsItem";
import { ReservationsRestaurantsItemSkeleton } from "./ReservationsRestaurantsItemSkeleton";

dayjs.extend(utc);

export const ReservationsRestaurantsList = async ({
  userId,
}: {
  userId: string;
}) => {
  const reservationsRestaurants =
    await api().getFilteredReservationsRestaurants("user_id", userId);

  if (reservationsRestaurants.length === 0) {
    return <Text>You don't have any reservations</Text>
  }

  return (
    <Stack gap="md">
      {reservationsRestaurants.sort((a,b) => dayjs(a.start).isBefore(dayjs(b.start)) ? 1 : -1).map((reservation) => (
        <ReservationsRestaurantsItem
          showEdit
          reservationRestaurant={reservation}
          key={reservation.reservation_id}
        />
      ))}
    </Stack>
  );
};

export const ReservationsRestaurantsListSkeleton = () => {
  return (
    <Stack gap="md">
      {Array.from({ length: 5 }, (_, i) => (
        <ReservationsRestaurantsItemSkeleton key={i} />
      ))}
    </Stack>
  );
};
