import { Skeleton, Grid, GridCol, Stack } from "@mantine/core";

export const BookFormSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={30} width="50%" mb="md" />
      <div>
        <Grid>
          <GridCol span={{ base: 12, md: 3 }}>
            <Skeleton height={36} radius="sm" />
          </GridCol>
          <GridCol span={{ base: 12, md: 3 }}>
            <Skeleton height={36} radius="sm" />
          </GridCol>
          <GridCol span={{ base: 12, md: 3 }}>
            <Skeleton height={36} radius="sm" />
          </GridCol>
          <GridCol span={{ base: 12, md: 3 }}>
            <Skeleton height={36} radius="sm" />
          </GridCol>
        </Grid>
      </div>
    </Stack>
  );
};
