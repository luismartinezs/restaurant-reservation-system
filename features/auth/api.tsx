import "server-only"

import { createClient } from "@/lib/supabase/admin";
import { AdminUserAttributes } from "@supabase/supabase-js";

export function api() {
  const supabase = createClient();

  const getAll = async () => {
    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers();

    if (error) {
      throw error;
    }
    return users;
  };

  async function createUsersAsAdmin(users: AdminUserAttributes[]) {
    const supabase = createClient();

    const responses = await Promise.all(
      users.map((user) =>
        supabase.auth.admin.createUser({
          ...user,
          email_confirm: true,
          phone_confirm: true,
        })
      )
    );

    if (responses.some(({ error }) => error)) {
      throw new Error("Failed to create users");
    }

    return responses;
  }


  return {
    getAll,
    createUsersAsAdmin
  }
}
