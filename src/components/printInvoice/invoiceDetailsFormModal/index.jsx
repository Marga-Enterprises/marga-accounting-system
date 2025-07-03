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

  // check if rowData is multiple machines
  const isMultipleMachines = formValues.multipleMachines;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Invoice Details
        </Typography>

        <Box component="form" onSubmit={onPrint} sx={styles.form}>
          {(selectedRows.length > 1 || isMultipleMachines) && (
            <TextField
              label="Client Name"
              name="companyName"
              value={formValues.companyName}
              onChange={onChange}
              fullWidth
              sx={styles.formField}
            />
          )}

          <TextField
            label="TIN Number"
            name="tinNumber"
            value={formValues.tinNumber}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Full Address"
            name="fullAddress"
            value={formValues.fullAddress}
            onChange={onChange}
            fullWidth
            multiline
            rows={2}
            sx={styles.fullWidthField}
          />

          <TextField
            label="RD Type"
            name="rd"
            value={formValues.rd}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Business Style"
            name="businessStyle"
            value={formValues.businessStyle}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          {selectedRows.length === 1 && !isMultipleMachines && (
            <TextField
              label="Printer Model"
              name="printerModel"
              value={formValues.printerModel}
              onChange={onChange}
              fullWidth
              sx={styles.formField}
            />
          )}

          <TextField
            label="Billing Date"
            name="billingDate"
            value={formValues.billingDate}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          {rowData.CATEGORY === "RTP" && (
            <>
              <TextField
                label="Pages Consumed"
                name="pagesConsumed"
                value={formValues.pagesConsumed}
                onChange={onChange}
                fullWidth
                type="number"
                sx={styles.formField}
              />
              <TextField
                label="Rate Per Page"
                name="ratePerPage"
                value={formValues.ratePerPage}
                onChange={onChange}
                fullWidth
                type="number"
                sx={styles.formField}
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
            sx={styles.formField}
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
            sx={styles.formField}
          />

          {  /* if selected rows are more than 1 show the switch its automatic multiple machine */ }
          {selectedRows.length <= 1 && (
            <FormControlLabel
              control={
                <Switch
                  checked={!!formValues.multipleMachines}
                  onChange={(e) =>
                    onChange({
                      target: {
                        name: "multipleMachines",
                        value: e.target.checked,
                      },
                    })
                  }
                  color="primary"
                />
              }
              label="Multiple Machines"
              sx={styles.formField}
            />
          )}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ ...styles.buttonGroup, ...styles.fullWidthField }}
          >
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
