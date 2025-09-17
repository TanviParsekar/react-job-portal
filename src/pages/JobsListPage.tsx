import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLookups } from "../hooks/useLookups";
import { parseFiltersFromSearch, buildQueryString } from "../utils/query";
import { useJobs } from "../hooks/useJobs";
import { FiltersBar } from "../components/FiltersBar";
import { JobsGroupedList } from "../components/JobsGroupedList";

export const JobsListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { departments, locations, functions, loading: lookupsLoading } = useLookups();

  const parsed = parseFiltersFromSearch(location.search);
  const filters = {
    q: parsed.q || undefined,
    department: parsed.department || undefined,
    location: parsed.location || undefined,
    function: parsed.function || undefined,
  };

  const { jobs, loading: jobsLoading } = useJobs(filters);

  const handleFiltersChange = (newFilters: any) => {
    const qs = buildQueryString(newFilters);
    navigate({ pathname: "/", search: qs ? `?${qs}` : "" });
  };

  return (
    <div>
      <h1>Active Job Openings</h1>
      <FiltersBar
        q={parsed.q}
        department={parsed.department}
        location={parsed.location}
        func={parsed.function}
        onChange={handleFiltersChange}
        departments={departments}
        locations={locations}
        functions={functions}
      />
      <div>
        {jobsLoading ? <p>Loading jobs...</p> : <JobsGroupedList jobs={jobs ?? []} />}
      </div>
    </div>
  );
};
