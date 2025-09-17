import React, { useState, useEffect } from "react";
import type { Department, Location } from "../types";

type Props = {
  q: string;
  department: string;
  location: string;
  func: string;
  onChange: (filters: any) => void;
  departments: any[];
  locations: any[];
  functions: any[];
};

export const FiltersBar: React.FC<Props> = ({ q, department, location, func, onChange, departments, locations, functions }) => {
  const [search, setSearch] = useState(q);

  useEffect(() => setSearch(q), [q]);

  useEffect(() => {
    const id = setTimeout(() => onChange({ q: search, department, location, function: func }), 300);
    return () => clearTimeout(id);
  }, [search, department, location, func]);

  return (
    <div className="filters-bar">
      <input placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={department} onChange={(e) => onChange({ q: search, department: e.target.value, location, function: func })}>
        <option value="">All Departments</option>
        {departments.map((d:any) => <option key={d.id} value={d.id}>{d.title}</option>)}
      </select>

      <select value={location} onChange={(e) => onChange({ q: search, department, location: e.target.value, function: func })}>
        <option value="">All Locations</option>
        {locations.map((l:any) => <option key={l.id} value={l.id}>{l.title ?? l.city ?? l.title}</option>)}
      </select>

      <select value={func} onChange={(e) => onChange({ q: search, department, location, function: e.target.value })}>
        <option value="">All Functions</option>
        {functions.map((f:any) => <option key={f.id} value={f.id}>{f.title}</option>)}
      </select>
    </div>
  );
};
