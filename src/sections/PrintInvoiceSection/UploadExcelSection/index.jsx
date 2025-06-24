// react
import React from 'react';

// MUI
import { Button, Paper, Stack } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// styles
import styles from './styles';

const UploadExcelSection = ({ onFileUpload }) => {
  return (
    <Paper elevation={3} sx={styles.uploadSection}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <UploadFileIcon color="primary" />
        <Button component="label" variant="contained">
          Upload Excel
          <input
            hidden
            type="file"
            accept=".xlsx, .xls"
            onChange={onFileUpload}
          />
        </Button>
      </Stack>
    </Paper>
  );
};

export default React.memo(UploadExcelSection);
