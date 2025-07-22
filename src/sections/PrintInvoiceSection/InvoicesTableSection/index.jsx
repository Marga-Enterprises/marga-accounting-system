// react
import React from "react";

// mui
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Box,
} from "@mui/material";

// utils
import { convertDate } from "@utils/methods";

// styles
import styles from "./styles";

const InvoicesTableSection = ({
  data,
  selectedRows,
  toggleRow,
  onSaveBulkBillings,
}) => {
  if (!data.length) return null;

  return (
    <TableContainer component={Paper} elevation={3} sx={styles.tableContainer}>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedRows.length === 0}
          onClick={onSaveBulkBillings}
        >
          Save Selected Billings
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Invoice Month</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Invoice #</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Printed By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(index)}
                  onChange={() => toggleRow(index)}
                />
              </TableCell>
              <TableCell>{row["INVOICE MONTH"]}</TableCell>
              <TableCell>{row["CLIENT"]}</TableCell>
              <TableCell>{row["CATEGORY"]}</TableCell>
              <TableCell>{row["INVOICE NUM"]}</TableCell>
              <TableCell>{row["AMOUNT"]}</TableCell>
              <TableCell>{convertDate(row["INVOICE DATE"])}</TableCell>
              <TableCell>{row["PRINTED BY"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(InvoicesTableSection);
