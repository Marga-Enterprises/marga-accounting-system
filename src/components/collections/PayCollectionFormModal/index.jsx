// react
import React from "react";

// mui
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";

// styles
import styles from "./styles";

const PaymentFormModal = ({
  open,
  onClose,
  onSubmit,
  onFormChange,
  formValues,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Record Payment
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={styles.form}>
          <TextField
            label="OR Number"
            name="payment_or_number"
            value={formValues.payment_or_number || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Amount"
            name="payment_amount"
            type="number"
            value={formValues.payment_amount || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Payment Mode"
            name="payment_mode"
            value={formValues.payment_mode || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Remarks"
            name="payment_remarks"
            value={formValues.payment_remarks || ""}
            onChange={onFormChange}
            fullWidth
            multiline
            rows={3}
            sx={styles.formField}
          />

          <TextField
            label="Cheque Number"
            name="payment_cheque_number"
            value={formValues.payment_cheque_number || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Cheque Date"
            name="payment_cheque_date"
            type="date"
            value={formValues.payment_cheque_date || ""}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={styles.formField}
          />

          <TextField
            label="Cheque Bank Name"
            name="payment_cheque_bank_name"
            value={formValues.payment_cheque_bank_name || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Online Transfer Ref No."
            name="payment_online_transfer_reference_number"
            value={formValues.payment_online_transfer_reference_number || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Online Transfer Bank"
            name="payment_online_transfer_bank_name"
            value={formValues.payment_online_transfer_bank_name || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

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
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(PaymentFormModal);
