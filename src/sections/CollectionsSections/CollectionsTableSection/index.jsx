// react
import React from 'react';

// mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Button,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// utils 
import { formatPeso } from '@utils/methods';

const CollectionsTableSection = ({
  collections,
  loading,
  page,
  totalCollections,
  totalPages,
  onPageChange,
  onOpenPaymentModal,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.totalCollectionsBox}>
        <Typography variant="subtitle1" sx={styles.totalCollectionsLabel}>
          Total Collections:
        </Typography>
        <Typography variant="h6" sx={styles.totalCollectionsValue}>
          ₱{Number(totalCollections).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Client</TableCell>
              <TableCell sx={styles.tableHeadCell}>Category</TableCell>
              <TableCell sx={styles.tableHeadCell}>Invoice #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Amount</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {collections.length > 0 ? (
              collections.map((collection) => (
                <TableRow key={collection.id} hover>
                  <TableCell>{collection.billing?.department?.client_department_name}</TableCell>
                  <TableCell>{collection.billing?.billing_type}</TableCell>
                  <TableCell>{collection.collection_invoice_number}</TableCell>
                  <TableCell>{new Date(collection.collection_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {formatPeso(parseFloat(collection.collection_amount))}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="primary" 
                        onClick={() => onOpenPaymentModal(
                          collection.id,
                          collection.collection_invoice_number,
                          collection.billing?.department?.client_department_name,
                          collection.collection_amount,
                          collection.collection_date,
                          collection.billing?.billing_type,
                          collection.billing?.department?.client?.client_tin,
                          collection.billing?.department?.client_department_address
                        )}
                      >
                        Pay
                      </Button>
                      <Button variant="outlined" size="small" color="primary">
                        Follow Up
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
