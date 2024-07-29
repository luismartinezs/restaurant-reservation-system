import Link from "next/link";

import { getUser } from "../utils";

export async function AccountButton() {
  const { user } = await getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Link
        href="/account"
        className="py-2 px-3 flex rounded-md hover:underline bg-btn-background hover:bg-btn-background-hover"
      >
        Account
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md hover:underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
