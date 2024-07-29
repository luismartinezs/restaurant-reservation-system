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
}: {
  links?: Array<{ name: string; href: string }>;
}) {
  return (
    <>
      {links.map(({ name, href }) => (
        <li key={name}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </>
  );
}
