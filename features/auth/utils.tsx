// server only
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function checkAuth() {
  const { user } = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return { user };
}

export async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user };
}
