import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchJobById, fetchJobs } from "../api/jobs";
import type { Job } from "../types";

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [job, setJob] = useState<Job | null>(null);
  const [otherJobs, setOtherJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const j = await fetchJobById(id!);
        if (!mounted) return;
        setJob(j);
        if (j?.department?.id) {
          const res = await fetchJobs({ department: j.department.id });
          const items = res.jobs ?? res;
          setOtherJobs((items as Job[]).filter(x => x.id !== j.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  const shareUrl = window.location.href;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(job.title)}&url=${encodeURIComponent(shareUrl)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div>
      <h1>{job.title}</h1>
      <p><strong>Department:</strong> {job.department?.title}</p>
      <p><strong>Location:</strong> {job.location?.title ?? job.location?.city}</p>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />

      <div>
        <a href={job.applyUrl} target="_blank" rel="noreferrer">Apply</a>
      </div>

      {/* social share*/}
      <div>
        <h4>Share</h4>
        <a href={shareFacebook} target="_blank" rel="noreferrer">Facebook</a> |{" "}
        <a href={shareLinkedIn} target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
        <a href={shareTwitter} target="_blank" rel="noreferrer">Twitter</a>
      </div>

      <div>
        <h3>Other openings in {job.department?.title}</h3>
        {otherJobs.map(j => (
          <div key={j.id}>
            <Link to={`/jobs/${j.id}${location.search}`}>{j.title}</Link> — <a href={j.applyUrl} target="_blank" rel="noreferrer">Apply</a>
          </div>
        ))}
      </div>

      <div>
        <Link to={`/${location.search}`}>← Back to list</Link>
      </div>
    </div>
  );
};
