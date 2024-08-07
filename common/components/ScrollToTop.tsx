"use client";

import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Text, Transition, rem } from "@mantine/core";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Text ta="center">
        Affix is located at the bottom of the screen, scroll to see it
      </Text>
      <Affix position={{ bottom: 10, right: 10 }}>
        <Transition transition="slide-up" mounted={scroll.y > 100}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <FaArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
