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
  branches,
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
              <TableCell sx={styles.tableHeadCell}>Branch Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Address</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {branches.length > 0 ? (
              branches.map((branch) => (
                <TableRow key={branch.id} hover>
                  <TableCell>{branch.client_branch_name}</TableCell>
                  <TableCell>{branch.client_branch_address}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Select
                        value={branch.client_branch_status}
                        onChange={(e) =>
                          onStatusChange(
                            branch.id, 
                            branch.client_branch_name, 
                            branch.client_branch_address,
                            branch.client_branch_client_id,
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
                            branch.client_branch_status === 'active'
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
                  No branches found.
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
