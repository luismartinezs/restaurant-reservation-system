import "server-only"

import { createClient } from "@/lib/supabase/admin";

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

  return {
    getAll,
  }
}
