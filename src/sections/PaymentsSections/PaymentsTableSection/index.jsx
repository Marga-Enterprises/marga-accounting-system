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
  Button,
} from '@mui/material';

// mui icons
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// utils
import { formatPeso, capitalizeWords } from '@utils/methods';

const PaymentsTableSection = ({
  payments,
  loading,
  page,
  totalPages,
  onPageChange,
  onCancelPayment,
  onExportExcel
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.exportButtonWrapper}>
        <Button
          variant="outlined"
          color="success"
          sx={styles.exportButton}
          onClick={onExportExcel}
        >
          Export to Excel
        </Button>
      </Box>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Client</TableCell>
              <TableCell sx={styles.tableHeadCell}>Client TIN</TableCell>
              <TableCell sx={styles.tableHeadCell}>Client Department Address</TableCell>
              <TableCell sx={styles.tableHeadCell}>Invoice #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Date Paid</TableCell>
              <TableCell sx={styles.tableHeadCell}>Posting Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>Collection Date</TableCell>
              <TableCell sx={styles.tableHeadCell}>OR #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Amount</TableCell>
              <TableCell sx={styles.tableHeadCell}>Payment Mode</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    { payment.payment_is_cancelled && `(CANCELLED) `}
                    {payment.collection?.billing?.department?.client_department_name || '-'}
                  </TableCell>
                  <TableCell>{payment.collection?.billing?.department?.client?.client_tin || '-'}</TableCell>
                  <TableCell>{payment.collection?.billing?.department?.client_department_address || '-'}</TableCell>
                  <TableCell>{payment.payment_invoice_number || '-'}</TableCell>
                  <TableCell>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{payment.payment_posting_date ? new Date(payment.payment_posting_date).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{payment.payment_collection_date ? new Date(payment.payment_collection_date).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{payment.payment_or_number || '-'}</TableCell>
                  <TableCell>{formatPeso(parseFloat(payment.payment_amount))}</TableCell>
                  <TableCell>{capitalizeWords(payment.payment_mode) || '-'}</TableCell>
                  <TableCell>
                    <Tooltip title={payment.payment_is_cancelled ? "Already Cancelled" : "Cancel Payment"}>
                      <span>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onCancelPayment(payment.id)}
                          disabled={payment.payment_is_cancelled}
                        >
                          <CancelIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No payments found.
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

export default React.memo(PaymentsTableSection);
