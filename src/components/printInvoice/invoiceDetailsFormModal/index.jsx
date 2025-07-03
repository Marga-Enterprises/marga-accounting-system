// react
import React from "react";

// mui
import {
  Modal,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// styles
import styles from "./styles";


const InvoiceDetailsFormModal = ({
  open,
  formValues,
  selectedRows,
  data,
  onChange,
  onPrint,
  onClose,
}) => {
  // If selected rows length is only 1, get the row data
  const rowData = selectedRows ? data[selectedRows[0]] : {};
  console.log("WITH VAT", formValues.withVat);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Invoice Details
        </Typography>

        <Box component="form" onSubmit={(e) => onPrint(e)} sx={styles.form}>
          {/* Specific fields if selected rows length is only 1 */}
          {selectedRows.length > 1 && (
            <TextField
              label="Client Name"
              name="companyName"
              value={formValues.companyName}
              onChange={onChange}
              fullWidth
            />
          )}
          <TextField
            label="TIN Number"
            name="tinNumber"
            value={formValues.tinNumber}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Full Address"
            name="fullAddress"
            value={formValues.fullAddress}
            onChange={onChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="RD Type"
            name="rd"
            value={formValues.rd}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Business Style"
            name="businessStyle"
            value={formValues.businessStyle}
            onChange={onChange}
            fullWidth
          />
          {/* Specific fields if selected rows length is only 1 */}
          {selectedRows.length === 1 && (
            <TextField
              label="Printer Model"
              name="printerModel"
              value={formValues.printerModel}
              onChange={onChange}
              fullWidth
            />
          )}
          <TextField
            label="Billing Date"
            name="billingDate"
            value={formValues.billingDate}
            onChange={onChange}
            fullWidth
          />
          {/* Show only if one row is selected and category is RTP */}
          {rowData.CATEGORY === "RTP" && (
            <>
              <TextField
                label="Pages Consumed"
                name="pagesConsumed"
                value={formValues.pagesConsumed}
                onChange={onChange}
                fullWidth
                type="number"
              />
              <TextField
                label="Rate Per Page"
                name="ratePerPage"
                value={formValues.ratePerPage}
                onChange={onChange}
                fullWidth
                type="number"
              />
            </>
          )}
          <TextField
            label="Less Withholding Tax"
            name="lessWithholdingTax"
            value={formValues.lessWithholdingTax}
            onChange={onChange}
            fullWidth
            type="number"
          />
          <FormControlLabel
            control={
              <Switch
                checked={!!formValues.withVat}
                onChange={(e) =>
                  onChange({
                    target: {
                      name: "withVat",
                      value: e.target.checked,
                    },
                  })
                }
                color="primary"
              />
            }
            label="With VAT"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={styles.buttonGroup}>
            <Button onClick={onClose} color="inherit" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Print
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(InvoiceDetailsFormModal);
