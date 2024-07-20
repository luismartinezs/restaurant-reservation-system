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

export async function getUsersAsAdmin() {
  const supabase = createClient();

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    throw error;
  }

  return { users };
}

export async function createUserAsAdmin() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.createUser({
    email: "user@email.com",
    password: "password",
    user_metadata: { name: "Yoda" },
  });

  if (error) {
    throw error;
  }

  return { user };
}
