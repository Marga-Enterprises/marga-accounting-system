// react
import React, { useMemo } from 'react';

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

const BillingsMonthAndYearForm = ({ month, year, onMonthChange, onYearChange }) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2004;
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Box sx={styles.formContainer}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={styles.stack}>
        <FormControl size="small" sx={styles.formControl}>
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            value={month}
            label="Month"
            onChange={(e) => onMonthChange(e.target.value)}
            sx={styles.select}
          >
            {months.map((label, index) => (
              <MenuItem key={index} value={index}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={styles.formControl}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={year}
            label="Year"
            onChange={(e) => onYearChange(e.target.value)}
            sx={styles.select}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default React.memo(BillingsMonthAndYearForm);
