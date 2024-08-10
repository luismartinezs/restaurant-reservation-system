import NextLink from "next/link";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import { api } from "@/features/restaurants/api";
import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { Detail, DetailSkeleton } from "./components/detail";
import { BookFormSkeleton } from "@/features/reservations";
import { Anchor, Container } from "@mantine/core";
import { getUser } from "@/features/auth/utils";
import { Suspense } from "react";
import { FullBleedHero } from "@/common/components/FullBleedHero";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { getCloudinaryImageId, Id } from "@/features/restaurants";
import { CreateReservationForm } from "@/features/reservations/components/CreateReservationForm";
import { AvailableTimes } from "@/features/reservations/components/AvailableTimes";
import { Metadata, ResolvingMetadata } from "next";
import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";

type Props = { params: { id: string } };

function validateParams(params: any): params is Props["params"] {
  return typeof params.id === "string";
}

function getParamId(params: any): Id {
  invariant(validateParams(params), "Invalid params");

  const { id } = params;

  const numId = parseInt(id, 10);

  invariant(!isNaN(numId), "id must be a number");

  return numId;
}

function getMetadata(content: RestaurantStoryblok): Metadata {
  const { title, description, socialImage } = content;
  const metadata: Metadata = {};
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (socialImage) metadata.openGraph = { images: [socialImage] };
  return metadata;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const sbRes = await fetchData(getParamId(params));

    const content: RestaurantStoryblok = sbRes.data.story.content;

    if (content) {
      return getMetadata(content);
    }
    return {};
  } catch (err) {
    console.error(err);
  }

  return {};
}

export async function fetchData(restaurantId: Id) {
  let sbParams = { version: "draft" } as const;

  try {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/rico-rico/${restaurantId}`, sbParams, {
      cache: "no-store",
    });
  } catch (err) {
    return { data: null, error: err };
  }
}

// issue where is that this page will not be cached
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = await getUser();

  try {
    invariant(id, "id is required");

    const numId = parseInt(id, 10);

    invariant(!isNaN(numId), "id must be a number");

    const restaurant = await api().getRestaurantById(numId);

    try {
      const sbRes = await fetchData(restaurant.id);
      // console.log(JSON.stringify(sbRes.data.story, null, 2));

      if (sbRes.data && sbRes.data.story) {
        return <StoryblokStory story={sbRes.data.story} />;
      }
    } catch (err) {
      console.error(err);
    }

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
                <CreateReservationForm
                  restaurantId={restaurant.id}
                  userId={user?.id}
                />
              ) : (
                <div>
                  <Anchor
                    component={NextLink}
                    href={`/login?redirect=/restaurants/${id}`}
                  >
                    Login / register
                  </Anchor>{" "}
                  to make a reservation
                </div>
              )}
            </Suspense>
            <Suspense fallback={<div>Loading</div>}>
              <AvailableTimes
                restaurantId={restaurant.id}
                timesCount={5}
                buttonProps={{
                  size: "md",
                }}
              />
            </Suspense>
          </div>
        </Container>
      </>
    );
  } catch (err) {
    return notFound();
  }
}
