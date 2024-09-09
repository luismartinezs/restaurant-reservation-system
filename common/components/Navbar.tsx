import { AccountButton } from "@/features/auth";
import { NavLink } from "./NavLink.client";

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
        <NavLink key={name} name={name} href={href} />
      ))}
      {showAuthButton && (
        <li>
          <AccountButton />
        </li>
      )}
    </>
  );
}
