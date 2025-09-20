import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchJobById, fetchJobs } from "../api/jobs";
import type { Job } from "../types";
import {
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

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
          const res = await fetchJobs();
          const items = res.jobs ?? res;

          const filtered = (items as Job[]).filter(
            (x) => x.id !== j.id && x.department?.id === j.department?.id
          );

          setOtherJobs(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!job) return <Typography>Job not found</Typography>;

  const shareUrl = window.location.href;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    job.title
  )}&url=${encodeURIComponent(shareUrl)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <Box maxWidth="1100px" mx="auto" mt={4}>
      {/*Top Line */}
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ color: "black", fontWeight: "bold" }}
      >
        {job.department?.title} Department At Teknorix Systems{" "}
        {job.location?.state}
      </Typography>

      {/* Title */}
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {job.title}
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        sx={{ color: "rgba(29, 27, 27, 0.75)" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <BusinessIcon fontSize="small" />
          <Typography>{job.department?.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon fontSize="small" />
          <Typography>
            {job.location?.city}, {job.location?.state}
          </Typography>
        </Box>
        {job.type && (
          <Box
            px={2}
            py={0.7}
            bgcolor="#e0e3eb"
            borderRadius="4px"
            fontSize="10px"
            fontWeight="bold"
            fontFamily={"sans-serif"}
            color="rgba(29, 27, 27, 0.75)"
          >
            {job.type.toUpperCase()}
          </Box>
        )}
      </Box>

      {/* Apply Button */}
      {job.applyUrl && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          sx={{
            mb: 2,
            mt: 2,
            width: "150px",
            height: "35px",
            fontWeight: "bold",
            borderRadius: "20px",
            textTransform: "none",
            fontSize: "0.75rem",
          }}
        >
          Apply
        </Button>
      )}

      <Divider sx={{ my: 2 }} />

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        alignItems="flex-start"
      >
        {/* Left*/}
        <Box flex={3}>
          <Box
            dangerouslySetInnerHTML={{ __html: job.description }}
            sx={{ typography: "body1" }}
          />
        </Box>

        {/* Right */}
        <Box flex={1} minWidth={{ xs: "100%", md: "300px" }}>
          {/* Other Job Openings */}
          {otherJobs.length > 0 && (
            <Paper
              variant="outlined"
              sx={{ p: 2, mb: 3, backgroundColor: "#1976d213 " }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  borderBottom: "3px solid  #1976d2",
                  display: "inline-block",
                  pb: 0.5,
                  mb: 2,
                }}
              >
                OTHER JOB OPENINGS
              </Typography>
              {otherJobs.map((j) => (
                <Box key={j.id} mb={2.6}>
                  <Link
                    to={`/jobs/${j.id}${location.search}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography fontWeight="bold">{j.title}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      mt={0.5}
                      sx={{ color: "rgba(29, 27, 27, 0.75)" }}
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <BusinessIcon fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {j.department?.title}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {j.location?.city}, {j.location?.state}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Paper>
          )}

          {/* Share Job Openings */}
          <Box variant="outlined" sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                borderBottom: "3px solid  #1976d2",
                display: "inline-block",
                pb: 0.5,
                mb: 2,
              }}
            >
              SHARE JOB OPENINGS
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton
                component="a"
                href={shareFacebook}
                target="_blank"
                rel="noreferrer"
                sx={{ bgcolor: "#f0f2f5" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href={shareLinkedIn}
                target="_blank"
                rel="noreferrer"
                sx={{ bgcolor: "#f0f2f5" }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href={shareTwitter}
                target="_blank"
                rel="noreferrer"
                sx={{ bgcolor: "#f0f2f5" }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
