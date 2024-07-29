import React from "react";
import { getUser } from "@/features/auth/utils";
import { api } from "@/features/reservations/server";
import {
  Title,
  Paper,
  Text,
  Group,
  Stack,
  Badge,
  Container,
} from "@mantine/core";
import { FaCalendar, FaUsers, FaBuilding } from "react-icons/fa";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default async function Reservations() {
  const { user } = await getUser();

  invariant(user, "User not defined");

  const reservations = await api().getFilteredReservationsRestaurants(
    "user_id",
    user.id
  );

  return (
    <Container size="md">
      <Title order={2} mb="xl" fw={700} ta="center">
        Your Reservations
      </Title>
      <Stack gap="md">
        {reservations.map((reservation) => (
          <Paper key={reservation.reservation_id} p="md" withBorder shadow="sm">
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500}>
                {reservation.restaurant_name}
              </Text>
              <Badge color="blue" variant="light">
                {dayjs(reservation.start).local().format("YY-MM-DD")}
              </Badge>
            </Group>
            <Group gap="lg">
              <Group gap="xs">
                <FaCalendar size={18} />
                <Text size="sm">
                  {dayjs(reservation.start).local().format("hh:mm A")}
                </Text>
              </Group>
              <Group gap="xs">
                <FaUsers size={18} />
                <Text size="sm">{reservation.people} people</Text>
              </Group>
              <Group gap="xs">
                <FaBuilding size={18} />
                <Text size="sm">{reservation.location}</Text>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
