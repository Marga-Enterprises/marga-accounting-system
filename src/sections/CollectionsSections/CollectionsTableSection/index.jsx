// react
import React from 'react';

// mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const CollectionsTableSection = ({
  collections,
  loading,
  page,
  totalPages,
  onPageChange,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Invoice #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Amount</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
              <TableCell sx={styles.tableHeadCell}>Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Remarks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {collections.length > 0 ? (
              collections.map((collection) => (
                <TableRow key={collection.id} hover>
                  <TableCell>{collection.collection_invoice_number}</TableCell>
                  <TableCell>₱{parseFloat(collection.collection_amount).toFixed(2)}</TableCell>
                  <TableCell>{collection.collection_status}</TableCell>
                  <TableCell>{new Date(collection.collection_date).toLocaleDateString()}</TableCell>
                  <TableCell>{collection.collection_remarks || '—'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No collections found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default React.memo(CollectionsTableSection);
