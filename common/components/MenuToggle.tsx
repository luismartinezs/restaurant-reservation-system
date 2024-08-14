"use client";

import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { cn } from "../utils";

export const MenuToggle = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className="relative flex flex-col">
      <div
        className={cn("relative overflow-hidden", opened || "max-h-[500px]")}
      >
        {children}
        <div
          className={cn(
            "absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-b from-transparent to-background",
            opened && "hidden"
          )}
        ></div>
      </div>
     <div className="flex items-center justify-center">
       <button
         onClick={toggle}
         className="bg-background py-3 px-5 border border-stone-500"
       >
         {opened ? "Collapse menu" : "View full menu"}
       </button>
     </div>
    </div>
  );
};
