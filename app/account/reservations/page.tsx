import React, { Suspense } from "react";
import { getUser } from "@/features/auth/utils";
import { Title, Container } from "@mantine/core";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ReservationsRestaurantsList, ReservationsRestaurantsListSkeleton } from "@/features/reservations";

dayjs.extend(utc);

export default async function Reservations() {
  const { user } = await getUser();

  invariant(user, "User not defined");

  return (
    <Container size="md">
      <Title order={2} mb="xl" fw={700} ta="center">
        Your Reservations
      </Title>
      <Suspense fallback={<ReservationsRestaurantsListSkeleton />}>
        <ReservationsRestaurantsList userId={user.id} />
      </Suspense>
    </Container>
  );
}
