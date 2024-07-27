import Link from "next/link";

const links = [
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

export function Navbar() {
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
