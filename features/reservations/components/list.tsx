import { Button, Container, SimpleGrid } from "@mantine/core";
import { api } from "../api";
import Link from "next/link";
import Card from "./Card";
import { DeleteButton } from "./DeleteButton";

export async function List() {
  const { getAll } = api();
  const reservations = await getAll();

  return (
    <>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {reservations.map((reservation) => (
            <Card
              key={reservation.id}
              item={reservation}
              asLink
              deleteButton={
                <DeleteButton id={reservation.id} variant="subtle" />
              }
            />
          ))}
        </SimpleGrid>
        <Button component={Link} mt={16} href="/scaffold/reservations/new">
          Create
        </Button>
      </Container>
    </>
  );
}
