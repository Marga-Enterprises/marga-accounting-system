import React, { useState } from "react";
import { Button, Paper, Stack, Typography, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// styles
import styles from "./styles";

const UploadExcelSection = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files[0]) {
      onFileUpload(e);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={[
        styles.uploadSection,
        {
          border: isDragOver ? "2px dashed #2196F3" : "2px dashed #E0E0E0",
          backgroundColor: isDragOver ? "#f1f8ff" : "#ffffff",
          cursor: "pointer",
          padding: "30px",
        },
      ]}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <UploadFileIcon sx={styles.icon} />
        <Typography variant="h6" sx={styles.header}>
          Drag and drop an Excel file
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Supported formats: .xlsx, .xls
        </Typography>
        <Box sx={{ display: "none" }}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={onFileUpload}
            id="excel-upload"
          />
        </Box>
        <Button
          component="label"
          htmlFor="excel-upload"
          variant="contained"
          sx={styles.button}
        >
          Upload Excel
        </Button>
      </Stack>
    </Paper>
  );
};

export default React.memo(UploadExcelSection);
