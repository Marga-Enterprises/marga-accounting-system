// MUI
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PrintIcon from "@mui/icons-material/Print";

// logic
import { useLogic } from "./useLogic";

// sections
import InvoicesTableSection from "@sections/PrintInvoiceSection/InvoicesTableSection";
import PrintPreviewSection from "@sections/PrintInvoiceSection/PrintPreviewSection";

// styles
import styles from "./styles";

const PrintInvoicePage = () => {
  const {
    data,
    selectedRows,
    handleFileUpload,
    toggleRow,
    handlePrint,
  } = useLogic();

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Print Invoice
      </Typography>

      {/* Upload Section */}
      <Paper elevation={3} sx={styles.uploadSection}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <UploadFileIcon color="primary" />
          <Button component="label" variant="contained">
            Upload Excel
            <input
              hidden
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </Button>
        </Stack>
      </Paper>

      {/* Table Section */}
      <InvoicesTableSection
        data={data}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
      />

      {/* Print Button + Hidden Preview */}
      {selectedRows.length > 0 && (
        <Box sx={styles.printButtonWrapper}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print Selected ({selectedRows.length})
          </Button>

          {/* Hidden Printable Section */}
          <PrintPreviewSection data={data} selectedRows={selectedRows} />
        </Box>
      )}
    </Container>
  );
};

export default PrintInvoicePage;
