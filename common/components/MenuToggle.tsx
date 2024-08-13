"use client";

import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { cn } from "../utils";

export const MenuToggle = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn("relative overflow-hidden", opened || "max-h-[500px]")}
      >
        {children}
        <div
          className={cn(
            "absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-b from-transparent to-[#242424]",
            opened && "hidden"
          )}
        ></div>
      </div>
      <button
        onClick={toggle}
        className="bg-[#242424] py-3 px-5 border border-stone-500"
      >
        {opened ? "Collapse menu" : "View full menu"}
      </button>
    </div>
  );
};
