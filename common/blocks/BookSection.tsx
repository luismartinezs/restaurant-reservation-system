"use client";

import { BookSectionStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { SectionContainer } from "../components/SectionContainer";
import { useParams } from "next/navigation";
import { getParamId } from "@/app/restaurants/[id]/utils";
import { CreateReservationForm } from "@/features/reservations/components/CreateReservationForm";
import { useUser } from "@/features/auth/hooks";
import { Anchor, Loader } from "@mantine/core";
import NextLink from "next/link";

export const BookSection = ({ blok }: { blok: BookSectionStoryblok }) => {
  const params = useParams<{ id: string }>();

  const id = getParamId(params);

  const { user, loading, error } = useUser();

  return (
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
          <CreateReservationForm restaurantId={id} userId={user?.id} />
        )
      }
    </SectionContainer>
  );
};
