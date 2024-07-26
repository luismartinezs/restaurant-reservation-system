import Link from "next/link";

import { Button } from "@mantine/core";

import { getUser } from "../utils";
import { signOut } from "../actions";

export async function AuthButton() {
  const { user } = await getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button variant="primary" type="submit">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
