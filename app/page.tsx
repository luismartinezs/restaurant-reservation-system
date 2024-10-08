import React, { Suspense } from "react";
import { Text, Container, Title, Stack } from "@mantine/core";
import { FullBleedHero } from "@/common/components/FullBleedHero";
import { TopRecommendations } from "@/features/restaurants/components/landing/TopRecommendations";
import { NewThisWeek } from "@/features/restaurants/components/landing/NewThisWeek";
import { SectionByLocation } from "@/features/restaurants/components/landing/SectionByLocation";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { Search, SearchSkeleton } from "@/features/search";

const RestaurantListingPage = () => {
  return (
    <div className="flex flex-col gap-16">
      <FullBleedHero
        // subtitle="Discover delicious spots and save with deals"
        className="-mt-[18px]"
        content={
          <div className="px-8 py-6 bg-gradient-to-br from-stone-800 via-stone-900 to-black flex flex-col gap-4 items-center rounded">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl text-white font-bold">
                Find your table for any occasion
              </h1>
            </div>
            <Suspense fallback={<SearchSkeleton />}>
              <Search size="md" isMagicButton />
            </Suspense>
          </div>
        }
        image={
          <CloudinaryImage
            folderPath="assets"
            imgId="hero_banner_1920_qcmdaw"
            alt="test"
            className="object-cover max-w-fit"
            width={1920}
            height={400}
            crop="fill"
            gravity="center"
          />
        }
      />
      <Container size="xl">
        <div className="flex flex-col gap-16">
          <TopRecommendations />

          <NewThisWeek />

          <SectionByLocation />

          <Container>
            <Stack>
              <Title order={2}>About RicoRico</Title>
              <Text>
                Welcome to RicoRico, your ultimate destination for seamless
                dining experiences. Our premier platform connects diners with
                top restaurants for unforgettable moments.
              </Text>
              <Text>
                With RicoRico, discover restaurants, make bookings, and save
                with exclusive deals. Plus, enjoy the convenience of pick-up and
                delivery options, all through our user-friendly app. Our
                platform also integrates reservation, call, queue, and table
                management solutions, ensuring a smooth operation for our
                restaurant partners.
              </Text>
              <Text>
                Since our inception, RicoRico has consistently grown, partnering
                with the finest restaurants to deliver exceptional service. Join
                the millions of diners who trust RicoRico for their dining
                needs, and experience the best in culinary delights.
              </Text>
            </Stack>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default function Home() {
  return <RestaurantListingPage />;
}
