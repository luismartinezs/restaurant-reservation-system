import React from "react";
import { getUser } from "@/features/auth/utils";
import { Title, Container } from "@mantine/core";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ReservationsRestaurantsList } from "@/features/reservations";

dayjs.extend(utc);

export default async function Reservations() {
  const { user } = await getUser();

  invariant(user, "User not defined");

  // const handleDel = handleDelete.bind(null, reservationsRestaurants.reservation_id, "/account/reservations");

  return (
    <Container size="md">
      <Title order={2} mb="xl" fw={700} ta="center">
        Your Reservations
      </Title>
      <ReservationsRestaurantsList userId={user.id} />
    </Container>
  );
}
