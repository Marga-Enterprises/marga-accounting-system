// react
import React from "react";

// mui
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// styles
import styles from "./styles";


const InvoiceDetailsFormModal = ({
  open,
  formValues,
  onChange,
  onPrint,
  onClose,
}) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Invoice Details
        </Typography>

        <Box component="form" onSubmit={(e) => onPrint(e)} sx={styles.form}>
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
          <TextField
            label="Printer Model"
            name="printerModel"
            value={formValues.printerModel}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Billing Date"
            name="billingDate"
            value={formValues.billingDate}
            onChange={onChange}
            fullWidth
          />
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
