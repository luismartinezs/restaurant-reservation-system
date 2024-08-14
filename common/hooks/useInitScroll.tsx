import { useEffect, useRef } from "react";
import { handleScroll } from "../utils.client";

export function useInitScroll() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      // set a timer so DOM has time to render
      timer.current = setTimeout(() => {
        handleScroll(hash.replace("#", ""));
      }, 500);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, []);
}
