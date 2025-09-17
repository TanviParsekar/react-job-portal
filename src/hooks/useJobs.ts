import { useEffect, useState, useRef } from "react";
import { fetchJobs } from "../api/jobs";
import type { Job } from "../types";

export const useJobs = (filters: Record<string, any>) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        abortRef.current?.abort();
        abortRef.current = new AbortController();
        // pass filters as params to API
        const data = await fetchJobs(filters);
        if (!mounted) return;
        // adapt to actual API output shape:
        const items = data.jobs ?? data;
        setJobs(items);
      } catch (err: any) {
        if (err.name === "CanceledError") return;
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
      abortRef.current?.abort();
    };
  }, [JSON.stringify(filters)]);        // stringify to compare deeply

  return { jobs, loading, error };
};
