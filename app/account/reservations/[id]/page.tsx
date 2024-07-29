import React from "react";
import { Title, Container } from "@mantine/core";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { notFound } from "next/navigation";
import { checkAuth } from "@/features/auth/utils";
import { api } from "@/features/reservations/server";
import { ReservationsRestaurantsItem } from "@/features/reservations";

dayjs.extend(utc);

export default async function ReservationPage({ params }: { params: { id: string } }) {
  const { id } = params;
  checkAuth();

  try {
    invariant(id, "id is required");

    const numId = parseInt(id, 10);

    invariant(!isNaN(numId), "id must be a number");

    const reservationRestaurant = await api().getReservationRestaurantByReservationId(numId)

    return (<>
      <ReservationsRestaurantsItem reservationRestaurant={reservationRestaurant} />
    </>
    );
  } catch (err) {
    return notFound();
  }


}
