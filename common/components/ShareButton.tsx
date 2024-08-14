"use client";

import { FaXTwitter, FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { cn } from "../utils";

const propsMap = {
  x: {
    // https://x.com/share?url=https://example.com
    baseUrl: "https://x.com/share?url=",
    icon: FaXTwitter,
    label: "Share on X",
    className:
      "bg-black hover:bg-stone-900 group-focus:bg-stone-900 ring-stone-700",
  },
  facebook: {
    // https://www.facebook.com/sharer/sharer.php?u=https://example.com
    baseUrl: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: FaFacebook,
    className:
      "bg-facebook hover:bg-facebook-600 group-focus:bg-facebook-600 ring-facebook-600",
    label: "Share on Facebook",
  },
  linkedin: {
    // https://www.linkedin.com/sharing/share-offsite/?url=https://example.com
    baseUrl: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: FaLinkedinIn,
    className:
      "bg-linkedin hover:bg-linkedin-600 group-focus:bg-linkedin-600 ring-linkedin-600",

    label: "Share on LinkedIn",
  },
};

// bg-facebook bg-x bg-linkedin

export const ShareButton = ({ name }: { name: keyof typeof propsMap }) => {
  const { baseUrl, icon: Icon, label, className } = propsMap[name];
  const [href, setHref] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHref(`${baseUrl}${window.location.href}`);
  })

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      className="text-white group focus:outline-none"
    >
      <div
        className={cn(
          "rounded-full group-focus:border-0 group-focus:ring-4 p-2 ring-offset-2 ring-offset-[#242424]",
          className
        )}
      >
        <Icon size={20} />
      </div>
    </a>
  );
};

// flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/50 ring-offset-4 ring-offset-white group-focus:border-0 group-focus:ring-2  bg-twitter hover:bg-twitter-600 group-focus:bg-twitter-600 group-focus:ring-twitter-600
