import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Box,
  Stack,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

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

export const FiltersBar: React.FC<Props> = ({
  q,
  department,
  location,
  func,
  onChange,
  departments,
  locations,
  functions,
}) => {
  const [search, setSearch] = useState(q);

  useEffect(() => setSearch(q), [q]);

  useEffect(() => {
    const id = setTimeout(
      () => onChange({ q: search, department, location, function: func }),
      300
    );
    return () => clearTimeout(id);
  }, [search, department, location, func]);

  const handleClearAll = () => {
    setSearch("");
    onChange({ q: "", department: "", location: "", function: "" });
  };

  const activeFilters = [
    search && { label: `Search: ${search}`, key: "q" },
    department && {
      label:
        `${
          departments.find((d) => d.id == department)?.title ?? department
        }`,
      key: "department",
    },
    location && {
      label:
        `${
          locations.find((l) => l.id == location)?.title ??
          locations.find((l) => l.id == location)?.city ??
          location
        }`,
      key: "location",
    },
    func && {
      label: `${
        functions.find((f) => f.id == func)?.title ?? func
      }`,
      key: "function",
    },
  ].filter(Boolean);

  const handleChipDelete = (key: string) => {
    if (key === "q") setSearch("");
    const newFilters = {
      q: key === "q" ? "" : search,
      department: key === "department" ? "" : department,
      location: key === "location" ? "" : location,
      function: key === "function" ? "" : func,
    };
    onChange(newFilters);
  };

  return (
    <Box 
    sx={{
    backgroundColor: "#f5f5f5",
    p: 2, 
    borderRadius: 2, 
  }}
    >
      {/* Filters*/}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          placeholder="Search for Job"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
          }}
          slotProps={{
          input: {
            endAdornment: (
              <IconButton edge="end" size="small">
                <SearchIcon />
              </IconButton>
            ),
          },
        }}
        />

        <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
          <Select
            value={department || ""}
            onChange={(e) =>
              onChange({
                q: search,
                department: e.target.value,
                location,
                function: func,
              })
            }
            displayEmpty
            IconComponent={ArrowForwardIosIcon}

            renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#999" }}>Department</span>;
                const selectedDept = departments.find((d) => d.id == selected);
                return selectedDept ? selectedDept.title : selected;
            }}
            
          >
            <MenuItem disabled value="">Department</MenuItem>
            {departments.map((d: any) => (
              <MenuItem key={d.id} value={d.id}>
                {d.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
          <Select
            value={location || ""}
            onChange={(e) =>
              onChange({
                q: search,
                department,
                location: e.target.value,
                function: func,
              })
            }
            displayEmpty
            IconComponent={ArrowForwardIosIcon}

            renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#999" }}>Location</span>;
                const selectedLoc = locations.find((l) => l.id == selected);
                return selectedLoc ? selectedLoc.title ?? selectedLoc.city : selected;
            }}
          >
            <MenuItem disabled value="">Location</MenuItem>
            {locations.map((l: any) => (
              <MenuItem key={l.id} value={l.id}>
                {l.title ?? l.city ?? l.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
          <Select
            value={func || ""}
            onChange={(e) =>
              onChange({
                q: search,
                department,
                location,
                function: e.target.value,
              })
            }
            displayEmpty
            IconComponent={ArrowForwardIosIcon}

            renderValue={(selected) => {
                if (!selected) return <span style={{ color: "#999" }}>Function</span>;
                const selectedFunc = functions.find((f) => f.id == selected);
                return selectedFunc ? selectedFunc.title : selected;
            }}
          >
            <MenuItem disabled value="">Function</MenuItem>
            {functions.map((f: any) => (
              <MenuItem key={f.id} value={f.id}>
                {f.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Applied Filters */}
      {activeFilters.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          alignItems="center"
          mb={2}
        >
          {activeFilters.map((filter: any) => (
            <Chip
              key={filter.key}
              label={filter.label}
              onDelete={() => handleChipDelete(filter.key)}
              color="primary"
              variant="outlined"
            />
          ))}
          <Button size="small" onClick={handleClearAll}>
            Clear All
          </Button>
        </Stack>
      )}
    </Box>
  );
};
