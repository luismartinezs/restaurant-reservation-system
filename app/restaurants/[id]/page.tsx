import NextLink from "next/link";
import { api } from "@/features/restaurants/api";
import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { Detail, DetailSkeleton } from "./components/detail";
import { BookForm, BookFormSkeleton } from "@/features/reservations";
import { Anchor, Container } from "@mantine/core";
import { getUser } from "@/features/auth/utils";
import { Suspense } from "react";
import { FullBleedHero } from "@/common/components/FullBleedHero";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { getCloudinaryImageId } from "@/features/restaurants";
import { CreateReservationForm } from "@/features/reservations/components/CreateReservationForm";
import { AvailableTimes } from "@/features/reservations/components/AvailableTimes";

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
      <>
        <FullBleedHero
          title={restaurant.name}
          className="-mt-8"
          image={
            <CloudinaryImage
              folderPath="restaurants/heros"
              imgId={getCloudinaryImageId(
                restaurant,
                "interior_hero_1920_0001"
              )}
              fallback={
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700"></div>
              }
              alt="test"
              className="object-cover max-w-fit"
              width={1920}
              height={400}
              crop="fill"
              gravity="center"
            />
          }
        />
        <Container>
          <div className="flex flex-col gap-8">
            <Suspense fallback={<DetailSkeleton />}>
              <Detail restaurant={restaurant} />
            </Suspense>
            <Suspense fallback={<BookFormSkeleton />}>
              {user?.id ? (
                <CreateReservationForm restaurantId={restaurant.id} userId={user?.id} />
              ) : (
                <div>
                  <Anchor component={NextLink} href={`/login?redirect=/restaurants/${id}`}>
                    Login / register
                  </Anchor>{" "}
                  to make a reservation
                </div>
              )}
            </Suspense>
            <Suspense fallback={<div>Loading</div>}>
              <AvailableTimes restaurantId={restaurant.id} timesCount={5} buttonProps={{
                size: "md",
              }} />
            </Suspense>
          </div>
        </Container>
      </>
    );
  } catch (err) {
    return notFound();
  }
}
