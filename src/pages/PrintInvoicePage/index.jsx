// MUI
import { Box, Button, Container } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

// logic
import { useLogic } from "./useLogic";

// sections
import UploadExcelSection from "@sections/PrintInvoiceSection/UploadExcelSection";
import InvoicesTableSection from "@sections/PrintInvoiceSection/InvoicesTableSection";
import PrintPreviewSection from "@sections/PrintInvoiceSection/PrintPreviewSection";
import SearchInvoiceSection from "@sections/PrintInvoiceSection/SearchInvoiceSection";

// components
import InvoiceDetailsFormModal from "@components/printInvoice/invoiceDetailsFormModal";

// styles
import styles from "./styles";

const PrintInvoicePage = () => {
  const {
    data,
    selectedRows,
    searchQuery,
    invoiceFormValues,
    showInvoiceFormModal,
    handleChangeInvoiceFormValues,
    handleFileUpload,
    toggleRow,
    handlePrint,
    setSearchQuery,
    handleClearSearch,
    handleSearch,
    handleShowInvoiceFormModal,
    handleCloseInvoiceFormModal,
  } = useLogic();

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {/* Excel Upload Section */}
      <UploadExcelSection onFileUpload={handleFileUpload} />

      {/* Search Section */}
      <SearchInvoiceSection
        value={searchQuery}
        data={data}
        onChange={setSearchQuery}
        onSearch={(e) => handleSearch(e)}
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
        <>
          <Box sx={styles.printButtonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={handleShowInvoiceFormModal}
            >
              Print Selected ({selectedRows.length})
            </Button>

            <PrintPreviewSection 
              data={data} 
              selectedRows={selectedRows} 
              invoiceDetails={invoiceFormValues}
            />
          </Box>

          {/* Invoice Details Form Modal */}
          <InvoiceDetailsFormModal
            formValues={invoiceFormValues}
            onPrint={(e) => handlePrint(e)}
            open={showInvoiceFormModal}
            onChange={handleChangeInvoiceFormValues}
            onClose={handleCloseInvoiceFormModal}
          />
        </>
      )}
    </Container>
  );
};

export default PrintInvoicePage;
