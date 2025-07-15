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
  Button,
  Paper,
  Pagination,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

// utils
import { isValidEmail } from '@utils/methods';

const ClientBranchesTableSection = ({
  departments,
  loading,
  page,
  totalPages,
  selectedIds,
  onPageChange,
  onStatusChange,
  onOpenEmailModal,
  onSelectDepartmentIds,
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      {/* Button to trigger modal */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.header}>
        {selectedIds.length > 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenEmailModal}
            sx={styles.emailButton}
          >
            Send Email to Selected Departments
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={onOpenEmailModal}
            disabled
            sx={styles.emailButtonDisabled} 
          >
            Send Email to Selected Departments
          </Button>
        )}
      </Stack>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}></TableCell>
              <TableCell sx={styles.tableHeadCell}>Department Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Address</TableCell>
              <TableCell sx={styles.tableHeadCell}>Email Address</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.length > 0 ? (
              departments.map((department) => {
                const validEmail = isValidEmail(department.client_department_email);

                return (
                  <TableRow key={department.id} hover>
                    <TableCell>
                      {validEmail && (
                        <Checkbox
                          onChange={(e) =>
                            onSelectDepartmentIds(department.id, e.target.checked)
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell>{department.client_department_name}</TableCell>
                    <TableCell>{department.client_department_address}</TableCell>
                    <TableCell>{department.client_department_email}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Select
                          value={department.client_department_status}
                          onChange={(e) =>
                            onStatusChange(
                              department.id,
                              department.client_department_name,
                              department.client_department_address,
                              department.client_department_client_id,
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
                              department.client_department_status === 'active'
                                ? styles.statusDotActive.backgroundColor
                                : styles.statusDotInactive.backgroundColor,
                          }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
