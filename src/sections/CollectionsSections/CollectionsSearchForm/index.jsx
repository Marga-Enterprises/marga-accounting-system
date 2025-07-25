// react
import React, { useState } from 'react';

// mui
import { Box, TextField, Button, Stack } from '@mui/material';

// styles
import styles from './styles';

const CollectionsSearchForm = ({ searchedInvoice, onSubmitSearch }) => {
  const [searchText, setSearchText] = useState(searchedInvoice || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(searchText.trim());
  };

  const handleClearSearch = () => {
    setSearchText('');
    onSubmitSearch('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.searchForm}>
      <Stack direction="row" spacing={1} sx={styles.searchStack}>
        <TextField
          placeholder="Search invoice..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          sx={styles.searchInput}
        />
        <Button variant="contained" type="submit" sx={styles.searchButton}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleClearSearch} sx={styles.searchButton}>
          Clear
        </Button>
      </Stack>
    </Box>
  );
};

export default React.memo(CollectionsSearchForm);
