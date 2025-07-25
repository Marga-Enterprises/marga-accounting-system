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

const CollectionsTableFormatForm = ({ format, onChangeTableFormat }) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Format Filter */}
        <FormControl size="small">
          <InputLabel id="format-label">Format</InputLabel>
          <Select
            labelId="format-label"
            value={format}
            label="Format"
            onChange={(e) => onChangeTableFormat(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="age">Age</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default React.memo(CollectionsTableFormatForm);
