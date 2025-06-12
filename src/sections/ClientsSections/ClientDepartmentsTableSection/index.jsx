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

const ClientBranchesTableSection = ({
  departments,
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
              <TableCell sx={styles.tableHeadCell}>Department Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.length > 0 ? (
              departments.map((branch) => (
                <TableRow key={branch.id} hover>
                  <TableCell>{branch.client_department_name}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Select
                        value={branch.client_department_status}
                        onChange={(e) =>
                          onStatusChange(
                            branch.id, 
                            branch.client_department_name, 
                            branch.client_department_address,
                            branch.client_department_client_id,
                            e.target.value
                          )
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
                            branch.client_department_status === 'active'
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
                  No departments found.
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

export default React.memo(ClientBranchesTableSection);
