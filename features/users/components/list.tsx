import { Button, Container, SimpleGrid } from "@mantine/core";
import { adminApi } from "../api";
import Link from "next/link";
import Card from "./Card";
import { DeleteButton } from "./DeleteButton";
import { KEY } from "../constants";

export async function List() {
  const { getAll } = adminApi();
  const {data: {users}, error} = await getAll();

  return (
    <>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {users.map((user) => (
            <Card
              key={user.id}
              item={user}
              asLink
              deleteButton={
                <DeleteButton id={user.id} variant="subtle" />
              }
            />
          ))}
        </SimpleGrid>
        <Button component={Link} mt={16} href={`/scaffold/${KEY}/new`}>
          Create
        </Button>
      </Container>
    </>
  );
}
