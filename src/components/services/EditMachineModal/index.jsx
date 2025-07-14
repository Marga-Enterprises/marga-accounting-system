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

const EditMachineModal = ({
  open,
  formValues,
  onClose,
  onSendUpdate,
  onChange,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalWrapper}>
        <Typography variant="h6" sx={styles.title}>
          Edit Machine
        </Typography>

        <Box component="form" onSubmit={onSendUpdate} sx={styles.form}>
          <TextField
            label="Machine Brand"
            name="machine_brand"
            value={formValues.machine_brand}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Machine Model"
            name="machine_model"
            value={formValues.machine_model}
            onChange={onChange}
            fullWidth
            sx={styles.formField}
          />

          <TextField
            label="Machine Description"
            name="machine_description"
            value={formValues.machine_description}
            onChange={onChange}
            fullWidth
            multiline
            rows={2}
            sx={styles.fullWidthField}
          />

          <TextField
            label="Machine Serial Number"
            name="machine_serial_number"
            value={formValues.machine_serial_number}
            onChange={onChange}
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

export default React.memo(EditMachineModal);
