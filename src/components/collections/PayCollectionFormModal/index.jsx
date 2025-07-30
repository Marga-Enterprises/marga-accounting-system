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
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

// styles
import styles from "./styles";

const PayCollectionFormModal = ({
  open,
  onClose,
  onSubmit,
  onFormChange,
  formValues,
}) => {
  const paymentMode = formValues.payment_mode;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Save Payment
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={styles.form}>
          <TextField
            label="OR Number"
            name="payment_or_number"
            value={formValues.payment_or_number || ""}
            onChange={(e) => onFormChange(e)}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Amount"
            name="payment_amount"
            type="number"
            value={formValues.payment_amount || ""}
            onChange={(e) => onFormChange(e)}
            fullWidth
            sx={styles.formField}
          />

          <FormControl fullWidth sx={styles.formField}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              label="Payment Mode"
              name="payment_mode"
              value={paymentMode || ""}
              onChange={(e) => onFormChange(e)}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
              <MenuItem value="pdc">PDC</MenuItem>
              <MenuItem value="online_transfer">Online Transfer</MenuItem>
            </Select>
          </FormControl>

          {paymentMode === "cheque" && (
            <>
              <TextField
                label="Cheque Number"
                name="payment_cheque_number"
                value={formValues.payment_cheque_number || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                sx={styles.formField}
              />

              <TextField
                label="Cheque Date"
                name="payment_cheque_date"
                type="date"
                value={formValues.payment_cheque_date || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
            </>
          )}

          {paymentMode === "online_transfer" && (
            <>
              <TextField
                label="Online Transfer Ref No."
                name="payment_online_transfer_reference_number"
                value={formValues.payment_online_transfer_reference_number || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                sx={styles.formField}
              />

              <TextField
                label="Online Transfer Date"
                name="payment_online_transfer_date"
                type="date"
                value={formValues.payment_online_transfer_date || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
            </>
          )}

          {paymentMode === "pdc" && (
            <>
              <TextField
                label="PDC Number"
                name="payment_pdc_number"
                value={formValues.payment_pdc_number || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                sx={styles.formField}
              />

              <TextField
                label="PDC Date"
                name="payment_pdc_date"
                type="date"
                value={formValues.payment_pdc_date || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />

              <TextField
                label="PDC Deposit Date"
                name="payment_pdc_deposit_date"
                type="date"
                value={formValues.payment_pdc_deposit_date || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />

              <TextField
                label="PDC Credit Date"
                name="payment_pdc_credit_date"
                type="date"
                value={formValues.payment_pdc_credit_date || ""}
                onChange={(e) => onFormChange(e)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
            </>
          )}

          <TextField
            label="Remarks"
            name="payment_remarks"
            value={formValues.payment_remarks || ""}
            onChange={(e) => onFormChange(e)}
            fullWidth
            multiline
            rows={3}
            sx={styles.fullWidthField}
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

export default React.memo(PayCollectionFormModal);
