// react
import React from "react";

// mui
import {
  Modal,
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

// styles
import styles from "./styles";

// utils 
import { formatPeso } from '@utils/methods';


const PayCollectionFormModal = ({
  open,
  invoiceNumber,
  clientName,
  collectionToPay,
  billingDate,
  invoiceCategory,
  onClose,
  onSubmit,
  onFormChange,
  formValues,
  clientDepartmentAddress
}) => {
  const paymentMode = formValues.payment_mode;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Box sx={styles.header}>
          <Typography variant="h6" sx={styles.title}>
            Save Payment
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoText}>
            <span style={styles.invoiceInfoLabel}>Invoice #:</span> {invoiceNumber}
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoText}>
            <span style={styles.invoiceInfoLabel}>Client:</span> {clientName}
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoText}>
            <span style={styles.invoiceInfoLabel}>Client Department Address:</span> {clientDepartmentAddress}
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoText}>
            <span style={styles.invoiceInfoLabel}>Collection to Pay:</span> {formatPeso(parseFloat(collectionToPay))}
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoText}>
            <span style={styles.invoiceInfoLabel}>Billing Date:</span>{" "}
            {new Date(billingDate).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          <Typography variant="body2" sx={styles.invoiceInfoTextLast}>
            <span style={styles.invoiceInfoLabel}>Invoice Category:</span> {invoiceCategory}
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={styles.form}>
          <TextField
            label="Payment Date"
            name="payment_date"
            type="date"
            value={formValues.payment_date || ""}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={styles.formField}
          />

          <TextField
            label="Posting Date"
            name="payment_posting_date"
            type="date"
            value={formValues.payment_posting_date || ""}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={styles.formField}
          />

          <TextField
            label="Collection Date"
            name="payment_collection_date"
            type="date"
            value={formValues.payment_collection_date || ""}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={styles.formField}
          />

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
            label="Invoice Number"
            name="payment_invoice_number"
            value={formValues.payment_invoice_number || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          <FormControl fullWidth sx={styles.formField}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              label="Payment Mode"
              name="payment_mode"
              value={paymentMode || ""}
              onChange={onFormChange}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
              <MenuItem value="pdc">PDC</MenuItem>
              <MenuItem value="online_transfer">Online Transfer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Client TIN #"
            name="payment_client_tin"
            type="text"
            value={formValues.payment_client_tin || ""}
            onChange={onFormChange}
            fullWidth
            sx={styles.formField}
          />

          {paymentMode === "cheque" && (
            <>
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
            </>
          )}

          {paymentMode === "online_transfer" && (
            <>
              <TextField
                label="Online Transfer Ref No."
                name="payment_online_transfer_reference_number"
                value={formValues.payment_online_transfer_reference_number || ""}
                onChange={onFormChange}
                fullWidth
                sx={styles.formField}
              />
              <TextField
                label="Online Transfer Date"
                name="payment_online_transfer_date"
                type="date"
                value={formValues.payment_online_transfer_date || ""}
                onChange={onFormChange}
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
                onChange={onFormChange}
                fullWidth
                sx={styles.formField}
              />
              <TextField
                label="PDC Date"
                name="payment_pdc_date"
                type="date"
                value={formValues.payment_pdc_date || ""}
                onChange={onFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
              <TextField
                label="PDC Deposit Date"
                name="payment_pdc_deposit_date"
                type="date"
                value={formValues.payment_pdc_deposit_date || ""}
                onChange={onFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
              <TextField
                label="PDC Credit Date"
                name="payment_pdc_credit_date"
                type="date"
                value={formValues.payment_pdc_credit_date || ""}
                onChange={onFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={styles.formField}
              />
            </>
          )}

          <FormControl component="fieldset" sx={styles.fullWidthField}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              With Form 2307?
            </Typography>
            <RadioGroup
              row
              name="payment_has_2307"
              value={formValues.payment_has_2307 ? "yes" : "no"}
              onChange={(e) =>
                onFormChange({
                  target: {
                    name: "payment_has_2307",
                    value: e.target.value === "yes"
                  }
                })
              }
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="2307 Amount"
            name="payment_2307_amount"
            type="number"
            value={formValues.payment_2307_amount || ""}
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
