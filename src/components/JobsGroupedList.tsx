import React from "react";
import type { Job } from "../types";
import { groupBy } from "../utils/groupBy";
import { Link, useLocation } from "react-router-dom";

type Props = { jobs: Job[] };

export const JobsGroupedList: React.FC<Props> = ({ jobs }) => {
  const map = groupBy(jobs, (j) => (j.department?.title ?? "Others"));
  const location = useLocation();

  return (
    <div>
      {Array.from(map.entries()).map(([dept, list]) => (
        <section key={String(dept)}>
          <h2>{dept} ({list.length})</h2>
          <div>
            {list.map(job => (
              <article key={job.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
                <h3>{job.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: job.description?.slice(0, 200) + (job.description?.length > 200 ? "..." : "") }} />
                <div>
                  <Link to={`/jobs/${job.id}${location.search}`}>View</Link>
                  {" | "}
                  <a href={job.applyUrl} target="_blank" rel="noreferrer">Apply</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
