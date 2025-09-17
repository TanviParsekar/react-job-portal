import React from "react";
import type { Job } from "../types";
import { groupBy } from "../utils/groupBy";
import { Link, useLocation } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Business, LocationOn } from "@mui/icons-material";

type Props = { jobs: Job[] };

export const JobsGroupedList: React.FC<Props> = ({ jobs }) => {
  const map = groupBy(jobs, (j) => j.department?.title ?? "Others");
  const location = useLocation();

  return (
    <Box p={5}>
      {Array.from(map.entries()).map(([dept, list]) => (
        <Box key={String(dept)} mb={6}>
          {/* Department Heading */}
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ borderBottom: "3.4px solid #1976d2", display: "inline-block" }}
          >
            {dept}
          </Typography>

          {/* Job List */}
          <Stack spacing={4} mt={2}>
            {list.map((job) => (
              <Box
                key={job.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/*Job Info */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job.title}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                    {/* Department */}
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Business fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {job.department?.title ?? "N/A"}
                      </Typography>
                    </Stack>

                    {/* Location */}
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {job.location?.city}, {job.location?.state}
                      </Typography>
                    </Stack>

                    {/* Job Type */}
                    {job.type && (
                      <Typography
                        sx={{
                        fontSize:"9px",
                        borderRadius: "4px",
                        px: 1,
                        py: 0.5,
                        bgcolor: "#e0e3eb",
                        color:"rgba(29, 27, 27, 0.75)",
                        fontWeight: "bold",
                        }}
                      >
                        {job.type.toUpperCase()}
                      </Typography>
                    )}
                  </Stack>
                </Box>

                {/* View & Apply */}
                <Stack direction="row" spacing={2.2} alignItems="center">
                  {job.applyUrl && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ padding: "6px 10px",fontWeight:"bold", borderRadius: "20px", textTransform: "none", fontSize: "0.75rem" }}
                    >
                      Apply
                    </Button>
                  )}
                  <Link to={`/jobs/${job.id}${location.search}`}  style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight='bold'
                      sx={{ fontSize: "0.75rem",color:"black", cursor: "pointer" }}
                    >
                      View
                    </Typography>
                  </Link>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};
