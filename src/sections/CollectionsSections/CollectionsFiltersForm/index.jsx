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

const statusOptions = ['pending', 'paid'];

const dateRangeOptions = [
  { label: '1–29 days', value: '1-29' },
  { label: '30–59 days', value: '30-59' },
  { label: '60–89 days', value: '60-89' },
  { label: '90–119 days', value: '90-119' },
  { label: '120 days and above', value: '120' },
];

const CollectionsFiltersForm = ({
  status,
  dateRange,
  onChangeStatus,
  onChangeDateRange,
}) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="flex-start"
        sx={styles.stack}
      >
        {/* Status Filter */}
        <FormControl size="small" sx={styles.formControl}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Status"
            onChange={(e) => onChangeStatus(e.target.value)}
            sx={styles.select}
          >
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Range Filter */}
        <FormControl size="small" sx={styles.formControl}>
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
