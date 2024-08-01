import React from "react";
import NextImage from "next/image";
import {
  Text,
  Container,
  Card,
  Image,
  Group,
  SimpleGrid,
  CardSection,
  Title,
} from "@mantine/core";
import { FullBleedHero } from "@/common/components/FullBleedHero";
import { TopRecommendations } from "@/features/restaurants/components/landing/TopRecommendations";
import { NewThisWeek } from "@/features/restaurants/components/landing/NewThisWeek";
import { SectionByLocation } from "@/features/restaurants/components/landing/SectionByLocation";

const RestaurantListingPage = () => {
  return (
    <div className="flex flex-col mb-16 gap-16">
      <FullBleedHero
        title="Dining Made Easy"
        subtitle="Discover delicious spots and save with deals"
        image={
          <Image
            component={NextImage}
            src="https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg"
            fill
            alt="lorem ipsum"
            className="object-cover"
          />
        }
      />
      <Container size="xl">
        <div className="flex flex-col gap-14">
          <TopRecommendations />

          <NewThisWeek />

          {/* Add more sections here: New This Week, Discovery Made Easy, etc. */}

          <SectionByLocation />

          <Group>
            <Title>About RicoRico</Title>
            <Text>
              Welcome to RicoRico, your ultimate destination for seamless dining
              experiences. Our premier platform connects diners with top
              restaurants for unforgettable moments.
            </Text>
            <Text>
              With RicoRico, discover restaurants, make bookings, and save with
              exclusive deals. Plus, enjoy the convenience of pick-up and
              delivery options, all through our user-friendly app. Our platform
              also integrates reservation, call, queue, and table management
              solutions, ensuring a smooth operation for our restaurant
              partners.
            </Text>
            <Text>
              Since our inception, RicoRico has consistently grown, partnering
              with the finest restaurants to deliver exceptional service. Join
              the millions of diners who trust RicoRico for their dining needs,
              and experience the best in culinary delights.
            </Text>
          </Group>

        </div>
      </Container>
    </div>
  );
};

export default function Home() {
  return <RestaurantListingPage />;
}
