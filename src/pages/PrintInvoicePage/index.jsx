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
import LoadingScreen from "@components/common/LoadingScreen";

// styles
import styles from "./styles";

const PrintInvoicePage = () => {
  const {
    data,
    loading,
    selectedRows,
    searchQuery,
    invoiceFormValues,
    showInvoiceFormModal,
    setFinalPrintData,
    setSearchQuery,
    handleChangeInvoiceFormValues,
    handleFileUpload,
    toggleRow,
    handlePrint,
    handleClearSearch,
    handleSearch,
    handleShowInvoiceFormModal,
    handleCloseInvoiceFormModal,
  } = useLogic();

  // If loading, show loading screen
  if (loading) return <LoadingScreen />;

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
        loading={loading}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
      />

      
      {selectedRows.length > 0 && (
        <>
          {/* Print Button & Hidden Preview */}
          <Box sx={styles.printButtonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={() => handleShowInvoiceFormModal(data, selectedRows)}
            >
              Print Selected ({selectedRows.length})
            </Button>

            <PrintPreviewSection 
              data={data} 
              selectedRows={selectedRows} 
              invoiceDetails={invoiceFormValues}
              setFinalPrintData={setFinalPrintData}
            />
          </Box>

          {/* Invoice Details Form Modal */}
          <InvoiceDetailsFormModal
            selectedRows={selectedRows}
            data={data}
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
