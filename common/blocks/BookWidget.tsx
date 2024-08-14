"use client";

import { BookWidgetStoryblok } from "@/lib/storyblok/component-types-sb";
import { SectionContainer } from "@/common/components/SectionContainer";
import { BlokWrapper } from "@/common/components/BlokWrapper";
import { useParams } from "next/navigation";
import { getParamId } from "@/app/restaurants/[id]/utils";
import { useUser } from "@/features/auth/hooks";
import { Anchor, Card, Loader } from "@mantine/core";
import NextLink from "next/link";
import { CreateReservationWidget } from "@/features/reservations/components/CreateReservationWidget";
import { cn } from "../utils";

export const BookWidget = ({ blok }: { blok: BookWidgetStoryblok }) => {
  const params = useParams<{ id: string }>();

  const id = getParamId(params);

  const { user, loading, error } = useUser();

  return (
    <BlokWrapper blok={blok} className={cn(blok.sticky && "z-10 sticky top-[65px]")}>
      <SectionContainer>
        {
          // if user is not logged in
          loading ? (
            <div className="flex w-full justify-center items-center">
              <Loader />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : !user ? (
            <div className="prose-xl prose-invert">
              <Anchor
                size="xl"
                component={NextLink}
                href={`/login?redirect=/restaurants/${id}`}
              >
                Login / register
              </Anchor>{" "}
              to make a reservation
            </div>
          ) : (
           <div>
             <Card shadow="sm" withBorder>
               <CreateReservationWidget restaurantId={id} userId={user?.id} />
             </Card>
           </div>
          )
        }
      </SectionContainer>
    </BlokWrapper>
  );
};
