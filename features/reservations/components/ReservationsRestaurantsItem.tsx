"use client";

import React, { useState } from "react";
import {
  Paper,
  Text,
  Group,
  Badge,
  Anchor,
  Button,
  Loader,
} from "@mantine/core";
import { FaCalendar, FaUsers, FaBuilding } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import utc from "dayjs/plugin/utc";
import { ReservationRestaurant } from "../types";
import { handleDelete } from "../actions";
import invariant from "tiny-invariant";

dayjs.extend(utc);

export const ReservationsRestaurantsItem = ({
  reservationRestaurant,
  showEdit,
}: {
  reservationRestaurant: ReservationRestaurant;
  showEdit?: boolean;
}) => {
  const { reservation_id, restaurant_name, start, people, location } =
    reservationRestaurant;
  const [pending, setPending] = useState(false);
  const isCancellable = dayjs(start).subtract(1, "hour").isAfter(dayjs());
  const isEditable = isCancellable

  invariant(reservation_id, "Reservation ID not defined");

  async function remove() {
    setPending(true);
    try {
      await handleDelete(reservation_id as number, "/account/reservations");
    } catch (err) {
    } finally {
      setPending(false);
    }
  }

  return (
    <Paper p="md" withBorder shadow="sm">
      <Group justify="space-between" mb="xs">
        <Group align="baseline">
          <Text size="lg" fw={500}>
            {restaurant_name}
          </Text>
        </Group>
        <Badge variant="light">{dayjs(start).local().format("YY-MM-DD")}</Badge>
      </Group>
      <Group justify="space-between">
        <Group gap="lg">
          <Group gap="xs">
            <FaCalendar size={18} />
            <Text size="sm">{dayjs(start).local().format("hh:mm A")}</Text>
          </Group>
          <Group gap="xs">
            <FaUsers size={18} />
            <Text size="sm">{people} people</Text>
          </Group>
          <Group gap="xs">
            <FaBuilding size={18} />
            <Text size="sm">{location}</Text>
          </Group>
        </Group>
        <Group align="baseline">
          {isEditable && showEdit && (
            <Anchor
              component={Link}
              href={`/account/reservations/${reservation_id}`}
            >
              Edit
            </Anchor>
          )}
          {isCancellable && (
            <Button
              ml={10}
              variant="light"
              size="md"
              className="hover:underline"
              fw={400}
              onClick={remove}
              disabled={pending}
            >
              {pending ? <Loader size={16} color="gray.5" /> : "Cancel"}
            </Button>
          )}
        </Group>
      </Group>
    </Paper>
  );
};
