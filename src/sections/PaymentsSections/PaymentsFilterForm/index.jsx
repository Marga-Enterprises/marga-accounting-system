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
  TextField,
} from '@mui/material';

// styles
import styles from './styles';

const PaymentsFilterForm = ({
  type,
  dateRange,
  onChangeType,
  onChangeDateRange,
}) => {
  const paymentTypeOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'pdc', label: 'PDC' },
    { value: 'online_transfer', label: 'Online Transfer' },
  ];


  return (
    <Box sx={styles.formContainer}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="flex-start"
        sx={styles.stack}
      >
        {/* Type Filter */}
        <FormControl size="small" sx={styles.formControl}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Type"
            onChange={(e) => onChangeType(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="">All</MenuItem>
            {paymentTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Start Date */}
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={dateRange?.startDate || ''}
          onChange={(e) =>
            onChangeDateRange(e.target.value, dateRange?.endDate || '')
          }
          InputLabelProps={{ shrink: true }}
          sx={styles.formControl}
        />

        {/* End Date */}
        <TextField
          label="End Date"
          type="date"
          size="small"
          value={dateRange?.endDate || ''}
          onChange={(e) =>
            onChangeDateRange(dateRange?.startDate || '', e.target.value)
          }
          InputLabelProps={{ shrink: true }}
          sx={styles.formControl}
        />
      </Stack>
    </Box>
  );
};

export default React.memo(PaymentsFilterForm);
