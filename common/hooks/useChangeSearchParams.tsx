import { useSearchParams } from "next/navigation";
import { useSearchParamsStore } from "../stores/searchParams";

export function useChangeSearchParams() {
  const searchParams = useSearchParams();
  const storedParams = useSearchParamsStore(state => state.searchParams)
  const setStoredParams = useSearchParamsStore(state => state.update)

  function toParams(params: Record<string, string>): URLSearchParams{
    const newSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }

    return newSearchParams
  }

  function fromParams(searchParams: URLSearchParams): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      result[key] = value;
    }

    return result;
  }

  function get(): Record<string, string> {
    return fromParams(searchParams)
  }

  function getAsString() {
    return searchParams.toString();
  }

  // adds new search params keeping the old ones
  const update = (params: Record<string, string>) => {
    const newSearchParams = {...storedParams, ...params}
    setStoredParams(newSearchParams)

    return toParams(newSearchParams).toString();
  };

  const set = (params: Record<string, string>) => {
    setStoredParams(params)

    return toParams(params).toString();
  };

  const remove = (keys: string[]) => {
    const newStoredParams = {...storedParams}

    for (const key of keys) {
      delete newStoredParams[key]
    }
    setStoredParams(newStoredParams)

    return toParams(newStoredParams).toString();
  };

  return {
    getAsString,
    get,
    update,
    set,
    remove,
  };
}
