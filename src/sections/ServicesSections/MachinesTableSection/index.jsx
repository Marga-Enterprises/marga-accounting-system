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
  IconButton ,
  Paper,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';

// mui icons
import EditIcon from '@mui/icons-material/Edit';

// styles
import styles from './styles';

// components
import LoadingScreen from '@components/common/LoadingScreen';

const statusOptions = [
  'On Stock',
  'For Junk',
  'Field',
  'For Overhauling',
  'For Parts',
];

const MachinesTableSection = ({
  machines,
  loading,
  page,
  totalPages,
  onFetchMachine,
  onPageChange,
  onStatusChange
}) => {
  if (loading) return <LoadingScreen />;

  return (
    <Box sx={styles.root}>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>Brand</TableCell>
              <TableCell sx={styles.tableHeadCell}>Model</TableCell>
              <TableCell sx={styles.tableHeadCell}>Serial #</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
              <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {machines.length > 0 ? (
              machines.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell>{machine.machine_brand}</TableCell>
                  <TableCell>{machine.machine_model}</TableCell>
                  <TableCell>{machine.machine_serial_number}</TableCell>
                  <TableCell>
                    <Select
                      value={machine.machine_status}
                      onChange={(e) =>
                        onStatusChange(machine.id, e.target.value)
                      }
                      size="small"
                      fullWidth
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onFetchMachine(machine.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No machines found.
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

export default React.memo(MachinesTableSection);
