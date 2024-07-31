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
  Button,
  SimpleGrid,
  CardSection,
  GridCol,
} from "@mantine/core";
import { FullBleedHero } from "@/common/components/FullBleedHero";

const RestaurantCard = ({
  image,
  title,
  rating,
}: {
  image: string;
  title: string;
  rating: string;
}) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <CardSection>
      <Image
        component={NextImage}
        src={image}
        height={160}
        width={160}
        alt={title}
      />
    </CardSection>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={500}>{title}</Text>
      <Badge color="pink" variant="light">
        {rating}
      </Badge>
    </Group>

    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Book Now
    </Button>
  </Card>
);

const RestaurantListingPage = () => {
  return (
    <div className="flex flex-col mb-16 gap-8">
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
        <Grid>
          {[1, 2, 3, 4, 5].map((i) => (
            <GridCol key={i} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
              <RestaurantCard
                image={`https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg`}
                title={`Restaurant ${i}`}
                rating={`${4 + i * 0.2}/5`}
              />
            </GridCol>
          ))}
        </Grid>

        <Text size="lg" fw={600} mt="xl" mb="md">
          Top Recommendations
        </Text>
        <Grid>
          {[1, 2, 3, 4].map((i) => (
            <GridCol
              key={i}
              span={{
                base: 12,
                sm: 6,
                md: 3,
              }}
            >
              <RestaurantCard
                image={`https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg`}
                title={`Top Pick ${i}`}
                rating={`${4.5 + i * 0.1}/5`}
              />
            </GridCol>
          ))}
        </Grid>

        {/* Add more sections here: New This Week, Discovery Made Easy, etc. */}

        <Text size="lg" fw={600} mt="xl" mb="md">
          Browse by Locations
        </Text>
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
                <Text className="text-center">{location}</Text>
              </Card>
            )
          )}
        </SimpleGrid>

        {/* <Footer height={60} p="md" style={{ marginTop: "2rem" }}>
          <Text size="sm" align="center">
            © 2024 Chope. All rights reserved.
          </Text>
        </Footer> */}
      </Container>
    </div>
  );
};

export default function Home() {
  return <RestaurantListingPage />;
}
