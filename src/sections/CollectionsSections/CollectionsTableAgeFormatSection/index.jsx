// react
import React from 'react';

// mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';

// utils
import { bucketByAge } from '@utils/methods';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const CollectionsTableAgeFormatSection = ({
  collections,
  loading,
  page,
  totalPages,
  onPageChange,
  onOpenPaymentModal,
}) => {
  const AGE_BUCKETS = [
    { key: 'current', label: 'Current (1–29 days)', min: 0, max: 29 },
    { key: 'd30', label: '30 (30–59 days)', min: 30, max: 59 },
    { key: 'd60', label: '60 (60–89 days)', min: 60, max: 89 },
    { key: 'd90', label: '90 (90–119 days)', min: 90, max: 119 },
    { key: 'd120', label: '120 (120+ days)', min: 120 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Client</TableCell>
              <TableCell sx={styles.tableHeadCell}>Category</TableCell>
              <TableCell sx={styles.tableHeadCell}>Invoice #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Current (1-29 days)</TableCell>
              <TableCell sx={styles.tableHeadCell}>30 (30-59 days)</TableCell>
              <TableCell sx={styles.tableHeadCell}>60 (60-89 days)</TableCell>
              <TableCell sx={styles.tableHeadCell}>90 (90-119 days)</TableCell>
              <TableCell sx={styles.tableHeadCell}>120 (120 days and above)</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {collections.length > 0 ? (
              collections.map((collection) => {
                const ageColumns = bucketByAge(collection.collection_date, collection.collection_amount, AGE_BUCKETS);

                return (
                  <TableRow key={collection.id} hover>
                    <TableCell>{collection.billing?.department?.client_department_name}</TableCell>
                    <TableCell>{collection.billing?.billing_type}</TableCell>
                    <TableCell>{collection.collection_invoice_number}</TableCell>
                    <TableCell>{new Date(collection.collection_date).toLocaleDateString()}</TableCell>
                    <TableCell>{ageColumns.current}</TableCell>
                    <TableCell>{ageColumns.d30}</TableCell>
                    <TableCell>{ageColumns.d60}</TableCell>
                    <TableCell>{ageColumns.d90}</TableCell>
                    <TableCell>{ageColumns.d120}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button variant="contained" size="small" color="primary" onClick={() => onOpenPaymentModal(collection.id)}>
                          Pay
                        </Button>
                        <Button variant="outlined" size="small" color="primary">
                          Follow Up
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
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

export default React.memo(CollectionsTableAgeFormatSection);
