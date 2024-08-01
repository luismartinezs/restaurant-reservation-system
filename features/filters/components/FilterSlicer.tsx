import { Button, Collapse, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

export const FilterSlicer = ({
  items,
  renderItem,
  cutoff = 5,
}: {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  cutoff?: number;
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className="flex flex-wrap gap-5 md:flex-col">
        {items.slice(0, cutoff).map((item) => renderItem(item))}
        <Collapse in={opened}>
          <div className="flex flex-wrap gap-5 md:flex-col">
            {items.slice(cutoff).map((item) => renderItem(item))}
          </div>
        </Collapse>
        <Button onClick={toggle} variant="transparent">
          {opened ? "Show less" : "Show more"}
        </Button>
      </div>
    </>
  );
};
