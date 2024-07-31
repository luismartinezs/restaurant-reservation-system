import React from "react";
import NextImage from "next/image";
import {
  Text,
  Container,
  Grid,
  Card,
  Image,
  Badge,
  Group,
  SimpleGrid,
  CardSection,
  GridCol,
  Title,
} from "@mantine/core";
import { FullBleedHero } from "@/common/components/FullBleedHero";
import { RestaurantCard } from "@/features/restaurants/components/landing/RestaurantCard";
import { TopRecommendations } from "@/features/restaurants/components/landing/TopRecommendations";
import { NewThisWeek } from "@/features/restaurants/components/landing/NewThisWeek";

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

          <div>
            <Text size="lg" fw={600}>
              Browse by Locations
            </Text>
            <Text mb="lg">Discover restaurants in these locations</Text>
            <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="lg">
              {["Patong", "Kata", "Chalong", "Maekhao", "Phuket"].map(
                (location) => (
                  <Card key={location} shadow="sm" radius="md" withBorder>
                    <CardSection>
                      <Image
                        component={NextImage}
                        src={`https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg`}
                        height={160}
                        width={160}
                        alt={location}
                      />
                    </CardSection>
                    <Group justify="space-between" mt="md">
                      <Text fw={700} size="xl" className="text-center">
                        {location}
                      </Text>
                    </Group>
                  </Card>
                )
              )}
            </SimpleGrid>
          </div>
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

          {/* <Footer height={60} p="md" style={{ marginTop: "2rem" }}>
            <Text size="sm" align="center">
              © 2024 Chope. All rights reserved.
            </Text>
          </Footer> */}
        </div>
      </Container>
    </div>
  );
};

export default function Home() {
  return <RestaurantListingPage />;
}
