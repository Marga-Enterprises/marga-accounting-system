// react
import React from 'react';

// react-router-dom
import { Link as RouterLink } from 'react-router-dom';

// mui
import {
  Box,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// utils 
import { formatPeso } from '@utils/methods';

const BillingsTableSection = ({
  billings,
  month,
  year,
  totalBillings,
  totalBilledDepartments,
  totalDepartments,
  loading,
  page,
  totalPages,
  onPageChange,
  onOpenUnbilledDepartmentsModal,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.totalBillingsBox}>
        <Box>
          <Typography variant="subtitle1" sx={styles.totalBillingsLabel}>
            Billing Total For This Month:
          </Typography>
          <Typography variant="h6" sx={styles.totalBillingsValue}>
            ₱{Number(totalBillings).toLocaleString('en-PH', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => onOpenUnbilledDepartmentsModal(month, year)}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Billed Departments This Month:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {totalBilledDepartments} / {totalDepartments}
          </Typography>
        </Box>
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
            {billings.length > 0 ? (
              billings.map((billing) => (
                <TableRow key={billing.id} hover>
                  <TableCell>
                    {billing.department?.client_department_name || 'N/A'}
                  </TableCell>
                  <TableCell>{billing.billing_type}</TableCell>
                  <TableCell>{billing.billing_invoice_number}</TableCell>
                  <TableCell>
                    {new Date(billing.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {formatPeso(parseFloat(billing.billing_amount))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      component={RouterLink}
                      to={`/billings/${billing.id}`}
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
