export function getFilterQuery(params: {
  cuisine?: string | null;
  location?: string | null;
} = {}): {
  cuisine: string[]
  location: string[]
} {
  const { cuisine, location } = params
  return {
    cuisine: cuisine ? cuisine.split(",") : [],
    location: location ? location.split(",") : [],
  };
}