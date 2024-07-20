import { Box } from "@mantine/core";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Dev() {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select();

  console.log(users);


  return (
    <Box
      style={{
        color: "white",
        fontSize: "1.5rem",
      }}
    >
      Mantine sanity
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </Box>
  );
}
