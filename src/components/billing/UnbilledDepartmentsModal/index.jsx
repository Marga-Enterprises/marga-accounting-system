// react
import React from "react";

// mui
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";

// styles
import styles from "./styles";

// utils
import { formatPeso } from "@utils/methods";

const UnbilledDepartmentsModal = ({
  open,
  onClose,
  unbilledDepartments = [],
  onFetchUnbilledDepartments,
  loading = false,
}) => {
  const hasData = Array.isArray(unbilledDepartments) && unbilledDepartments.length > 0;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        {/* Header */}
        <Box sx={styles.header}>
          <Typography variant="h6" sx={styles.title}>
            Unbilled Departments
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoTextLast}>
            <Box component="span" sx={styles.invoiceInfoLabel}>Total:</Box>{" "}
            {loading ? "Loading…" : hasData ? unbilledDepartments.length : 0}
          </Typography>
        </Box>

        {/* Table */}
        <Box sx={styles.tableBlock}>
          <Paper elevation={0} sx={styles.paper}>
            <TableContainer sx={styles.tableContainer}>
              <Table stickyHeader size="small" aria-label="unbilled-departments-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    {/*<TableCell>Address</TableCell>*/}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={styles.loadingRowCell}>
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : !hasData ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={styles.emptyRowCell}>
                        <Typography variant="body2" color="text.secondary">
                          No unbilled departments found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    unbilledDepartments.map((row) => {
                      return (
                        <TableRow hover key={row.id}>
                          <TableCell>{row?.client_department_name ?? "—"}</TableCell>
                          {/*<TableCell>{row?.client_department_address ?? "—"}</TableCell>*/}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Footer buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={styles.buttonGroup}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default React.memo(UnbilledDepartmentsModal);
