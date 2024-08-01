import { Collapse } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-5 md:flex-col">
        {items.map((item) => renderItem(item))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-5 md:flex-col">
        {items.slice(0, cutoff).map((item) => renderItem(item))}
        <Collapse in={opened}>
          <div className="flex flex-wrap gap-5 md:flex-col">
            {items.slice(cutoff).map((item) => renderItem(item))}
          </div>
        </Collapse>
        <button
          type="button"
          onClick={toggle}
          className="flex gap-1 px-0 mx-0 justify-start text-sm items-center text-blue-400 hover:underline"
        >
          {opened ? (
            <>
              <span>Show less</span>
              <RxCaretUp size={18} />
            </>
          ) : (
            <>
              <span>Show more</span>
              <RxCaretDown size={18} />
            </>
          )}
        </button>
      </div>
    </>
  );
};
