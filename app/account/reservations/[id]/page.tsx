import React from "react";
import { Container } from "@mantine/core";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { notFound } from "next/navigation";
import { checkAuth } from "@/features/auth/utils";
import { api } from "@/features/reservations/server";
import { ReservationsRestaurantsItem } from "@/features/reservations";
import { EditReservationForm } from "@/features/reservations/components/EditReservationForm";

dayjs.extend(utc);

export default async function ReservationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { user } = await checkAuth();

  try {
    invariant(id, "id is required");

    const numId = parseInt(id, 10);

    invariant(!isNaN(numId), "id must be a number");

    const reservationRestaurant =
      await api().getReservationRestaurantByReservationId(numId);

    const { people, restaurant_id, start, user_id } =
      reservationRestaurant;

    // user must own reservation
    invariant(user.id === user_id);

    invariant(restaurant_id && start && people, "missing data");

    return (
      <Container>
        <ReservationsRestaurantsItem
          reservationRestaurant={reservationRestaurant}
        />
        <EditReservationForm
          restaurantId={restaurant_id}
          reservationId={numId}
          userId={user_id}
          initialData={{
            start,
            people,
            restaurant_id,
            user_id,
          }}
        />
      </Container>
    );
  } catch (err) {
    return notFound();
  }
}
