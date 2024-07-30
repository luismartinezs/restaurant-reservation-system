import { AccountButton } from "@/features/auth";
import Link from "next/link";

const defaultLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Restaurants",
    href: "/restaurants",
  },
  // {
  //   name: "Reservations",
  //   href: "/scaffold/reservations/list",
  // },
  // {
  //   name: "Ratings",
  //   href: "/scaffold/ratings/list",
  // },
  // {
  //   name: "Users",
  //   href: "/scaffold/users/list",
  // },
];

export function Navbar({
  links = defaultLinks,
  showAuthButton,
}: {
  links?: Array<{ name: string; href: string }>;
  showAuthButton?: boolean;
}) {
  return (
    <>
      {links.map(({ name, href }) => (
        <li key={name}>
          <Link
            href={href}
            className="py-2 px-3 flex rounded-md bg-btn-background hover:bg-btn-background-hover hover:underline"
          >
            {name}
          </Link>
        </li>
      ))}
      {showAuthButton && (
        <li>
          <AccountButton />
        </li>
      )}
    </>
  );
}
