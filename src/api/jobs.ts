import { api } from "./client";
import type { Job } from "../types";

type JobsListParams = {
  q?: string;                   // search query
  department?: number | string;
  location?: number | string;
  function?: number | string;
    //pagination params if API supports
};

export const fetchJobs = async (params: JobsListParams = {}) => {
  // Map frontend param names to API param names
  const res = await api.get<{ jobs: Job[] } & any>("/api/v1/jobs", { params });
  return res.data;
};

export const fetchJobById = async (id: string | number) => {
  const res = await api.get<Job>(`/api/v1/jobs/${id}`);
  return res.data;
};

// lookups
export const fetchDepartments = async () => {
  const res = await api.get<{ departments: any[] }>("/api/v1/departments");
  return res.data;
};

export const fetchLocations = async () => {
  const res = await api.get<{ locations: any[] }>("/api/v1/locations");
  return res.data;
};

export const fetchFunctions = async () => {
  const res = await api.get<{ functions: any[] }>("/api/v1/functions");
  return res.data;
};
