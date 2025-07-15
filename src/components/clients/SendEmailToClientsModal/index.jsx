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

const SendEmailToClientsModal = ({
  open,
  onClose,
  onSendEmail,
  onEmailFormChange,
  emailFormValues,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Send Email to Clients
        </Typography>

        <Box component="form" onSubmit={onSendEmail} sx={styles.form}>
          <TextField
            label="Subject"
            name="subject"
            value={emailFormValues.subject || ""}
            onChange={(e) => onEmailFormChange(e)}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Message"
            name="message"
            value={emailFormValues.message || ""}
            onChange={(e) => onEmailFormChange(e)}
            fullWidth
            multiline
            rows={4}
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
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(SendEmailToClientsModal);
