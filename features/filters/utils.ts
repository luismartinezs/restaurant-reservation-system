export function getFilterQuery(params: {
  cuisine?: string | null;
} = {}): {
  cuisine: string[]
} {
  const { cuisine } = params
  return {
    cuisine: cuisine ? cuisine.split(",") : [],
  };
}