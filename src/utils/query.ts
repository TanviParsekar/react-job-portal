// helpers for query param parsing + building
export const parseFiltersFromSearch = (search: string) => {
  const params = new URLSearchParams(search);
  return {
    q: params.get("q") || "",
    department: params.get("department") || "",
    location: params.get("location") || "",
    function: params.get("function") || "",
  };
};

export const buildQueryString = (filters: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== "") params.set(k, String(v));
  });
  return params.toString();
};
