// MUI
import { Box, Button, Container, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

// logic
import { useLogic } from "./useLogic";

// sections
import UploadExcelSection from "@sections/PrintInvoiceSection/UploadExcelSection";
import InvoicesTableSection from "@sections/PrintInvoiceSection/InvoicesTableSection";
import PrintPreviewSection from "@sections/PrintInvoiceSection/PrintPreviewSection";
import SearchInvoiceSection from "@sections/PrintInvoiceSection/SearchInvoiceSection";

// styles
import styles from "./styles";

const PrintInvoicePage = () => {
  const {
    data,
    selectedRows,
    handleFileUpload,
    toggleRow,
    handlePrint,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleSearch,
  } = useLogic();

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        Print Invoice
      </Typography>

      {/* Excel Upload Section */}
      <UploadExcelSection onFileUpload={handleFileUpload} />

      {/* Search Section */}
      <SearchInvoiceSection
        value={searchQuery}
        data={data}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {/* Display Parsed Excel Table */}
      <InvoicesTableSection
        data={data}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
      />

      {/* Print Button & Hidden Preview */}
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

          <PrintPreviewSection data={data} selectedRows={selectedRows} />
        </Box>
      )}
    </Container>
  );
};

export default PrintInvoicePage;
