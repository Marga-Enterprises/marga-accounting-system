// react
import React from 'react';

// mui
import {
  Box,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

// styles
import styles from './styles';

const statusOptions = [
  'pending',
  'paid',
  'cancelled',
];

const dateRangeOptions = [
  { label: '1–30 days', value: '1-30' },
  { label: '31–60 days', value: '31-60' },
  { label: '61–90 days', value: '61-90' },
  { label: '90 days and above', value: '90+' },
];

const CollectionsFiltersForm = ({ status, dateRange, onChangeStatus, onChangeDateRange }) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Status Filter */}
        <FormControl size="small">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Status"
            onChange={(e) => onChangeStatus(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="">All</MenuItem>
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Range Filter */}
        <FormControl size="small">
          <InputLabel id="range-label">Date Range</InputLabel>
          <Select
            labelId="range-label"
            value={dateRange}
            label="Date Range"
            onChange={(e) => onChangeDateRange(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="">All</MenuItem>
            {dateRangeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default React.memo(CollectionsFiltersForm);
