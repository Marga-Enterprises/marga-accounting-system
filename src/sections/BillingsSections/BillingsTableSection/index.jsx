// react
import React from 'react';

// react-router-dom
import { Link as RouterLink } from 'react-router-dom';

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
  Button,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const BillingsTableSection = ({
  billings,
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
              <TableCell sx={styles.tableHeadCell}>Department</TableCell>
              <TableCell sx={styles.tableHeadCell} align="right">
                Total Amount (₱)
              </TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {billings.length > 0 ? (
              billings.map((billing) => (
                <TableRow key={billing.id} hover>
                  <TableCell>{billing.billing_invoice_number}</TableCell>

                  <TableCell>
                    {billing.department?.client_department_name || '—'}
                  </TableCell>

                  <TableCell align="right">
                    {Number(billing.billing_total_amount).toLocaleString(
                      'en-PH',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={RouterLink}
                      to={`/billing/${billing.id}`}
                      color="primary"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No billings found.
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

export default React.memo(BillingsTableSection);
