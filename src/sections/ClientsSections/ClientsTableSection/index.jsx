// react
import React from 'react';

// mui
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const ClientsTableSection = ({
  clients,
  loading,
  page,
  totalPages,
  onPageChange,
  onStatusChange,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Client Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.client_name}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Select
                        value={client.client_status}
                        onChange={(e) =>
                          onStatusChange(client.id, client.client_name, e.target.value)
                        }
                        size="small"
                        sx={styles.selectStatus}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>

                      <Box
                        sx={{
                          ...styles.statusDot,
                          backgroundColor:
                            client.client_status === 'active'
                              ? styles.statusDotActive.backgroundColor
                              : styles.statusDotInactive.backgroundColor,
                        }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No clients found.
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

export default React.memo(ClientsTableSection);
