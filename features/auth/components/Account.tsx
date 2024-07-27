import { Card, Stack, Text } from "@mantine/core";

import { checkAuth } from "../utils";
import { AuthButton } from "./AuthButton";

export async function Account() {
  const { user } = await checkAuth();

  const { email } = user;

  return (
    <div>
      <Card shadow="xs" padding="md">
        <Stack>
          <Text>Your email: {email}</Text>
          <AuthButton />
        </Stack>
      </Card>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
}
