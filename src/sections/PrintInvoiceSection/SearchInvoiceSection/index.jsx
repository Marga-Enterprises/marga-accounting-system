import React from "react";
import { TextField, Paper, Box, Button } from "@mui/material";

// styles
import styles from "./styles";

const SearchInvoiceSection = ({ data, value, onChange, onSearch, onClear }) => {
  // If no data is provided, return null to avoid rendering
  if (!data || data.length === 0) return null;

  return (
    <Paper elevation={0} sx={styles.searchSection}>
      <Box component="form" onSubmit={(e) => onSearch(e)} display="flex" alignItems="center" justifyContent="space-between">
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search invoices (client, category, etc.)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          size="small"
        />

        {/* Search Button */}
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          type="submit"
        >
          Search
        </Button>

        {/* Clear Button */}
        <Button
          variant="outlined"
          onClick={onClear}
          sx={{ ml: 2 }}
          disabled={!value}
        >
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default React.memo(SearchInvoiceSection);
