import { LocationWidgetStoryblok } from "@/lib/storyblok/component-types-sb";
import { SectionContainer } from "@/common/components/SectionContainer";
import { BlokWrapper } from "@/common/components/BlokWrapper";
import { Image } from "./Image";
import { Card, Text } from "@mantine/core";
import { IoIosPin } from "react-icons/io";
import Link from "next/link";

export const LocationWidget = ({
  blok,
  ...rest
}: {
  blok: LocationWidgetStoryblok;
}) => {
  return (
    <BlokWrapper blok={blok}>
      <SectionContainer {...rest}>
        <Card
          shadow="sm"
          withBorder
          className="group transition-transform duration-300 ease-out has-[.restaurant-link:focus]:!outline has-[:focus]:outline-offset-2 has-[:focus]:!outline-1 has-[:focus]:!outline-[#c2255c]"
        >
          <Link
            href={blok.googleMapsLink}
            className="peer restaurant-link focus:outline-none"
          >
            <div className="flex flex-col gap-4">
              <Image blok={blok.mapThumbnail[0]} />
              <div className="flex gap-2 items-center">
                <Text c="primary">
                  <IoIosPin size={30} />
                </Text>
                <Text size="sm" className="group-hover:underline group-hover:text-primary">
                  {blok.address}
                </Text>
              </div>
            </div>
          </Link>
        </Card>
      </SectionContainer>
    </BlokWrapper>
  );
};
