import { api } from "@/features/restaurants/api";
import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { Detail } from "./components/detail";
import { BookForm } from "@/features/reservations";
import { Container } from "@mantine/core";
import { getUser } from "@/features/auth/utils";

// issue where is that this page will not be cached
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = await getUser();

  try {
    invariant(id, "id is required");

    const numId = parseInt(id, 10);

    invariant(!isNaN(numId), "id must be a number");

    const restaurant = await api().getRestaurantById(numId);

    return (
      <Container>
        <div className="flex flex-col gap-8">
          <Detail restaurant={restaurant} />
          {user?.id ? (
            <BookForm restaurantId={restaurant.id} userId={user?.id} />
          ) : (
            <div>Login / register to make a reservation</div>
          )}
        </div>
      </Container>
    );
  } catch (err) {
    return notFound();
  }
}
