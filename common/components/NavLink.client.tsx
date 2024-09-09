"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLink = ({ name, href }: { name: string; href: string }) => {
  const currentPath = usePathname();
  const isActive = (href: string) => href === currentPath;

  return (
    <li key={name}>
      {isActive(href) ? (
        <span className="py-2 px-3 flex rounded-md bg-btn-background-active text-white font-bold">
          {name}
        </span>
      ) : (
        <Link
          href={href}
          className="py-2 px-3 flex rounded-md bg-btn-background hover:bg-btn-background-hover hover:underline"
        >
          {name}
        </Link>
      )}
    </li>
  );
};
