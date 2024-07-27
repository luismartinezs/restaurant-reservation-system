import { useSearchParams } from "next/navigation";

export function useChangeSearchParams() {
  const searchParams = useSearchParams();

  function get(): Record<string, string> {
    const params = new URLSearchParams(searchParams.toString());
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  }

  function getAsString() {
    return searchParams.toString();
  }

  // adds new search params keeping the old ones
  const update = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }

    return newSearchParams.toString();
  };

  const set = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }

    return newSearchParams.toString();
  };

  return {
    getAsString,
    get,
    update,
    set,
  };
}
