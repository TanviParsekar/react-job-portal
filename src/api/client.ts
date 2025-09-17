import axios from "axios";

export const api = axios.create({
  baseURL: "https://teknorix.jobsoid.com",
  headers: { "Content-Type": "application/json" },
});
