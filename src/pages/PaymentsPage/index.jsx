// react
import { useEffect } from "react";

// router
import { useLocation, useNavigate } from "react-router-dom";

// custom hook
import { useLogic } from "./useLogic";

// mui
import { Box } from "@mui/material";

// styles
import styles from "./styles";

// sections
import PaymentsTableSection from "@sections/PaymentsSections/PaymentsTableSection";
import PaymentsFilterForm from "@sections/PaymentsSections/PaymentsFilterForm";
import PaymentsSearchForm from "@sections/PaymentsSections/PaymentSearchForm";

// components
import SnackbarAlert from '@components/common/SnackbarAlert';
import UpdatePaymentFormModal from '@components/payments/UpdatePaymentFormModal';


const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    payments,
    loading,
    type,
    showUpdatePaymentModal,
    openSnackbar,
    message,
    severity,
    paymentDetails,
    pageDetails,
    dateRange,
    handleFetchPayments,
    handleChangePaymentType,
    handleCancelPayment,
    handleExportToExcel,
    handleChangeDateRange,
    handleChangePaymentDetails,
    handleSavePaymentDetails,
    handleOpenUpdatePaymentModal,
    handleCloseUpdatePaymentModal
  } = useLogic();

  // use effect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const search = queryParams.get("search") || "";
    const type = queryParams.get("type") || "";
    const startDate = queryParams.get("startDate") || '';
    const endDate = queryParams.get("endDate") || '';

    handleFetchPayments(currentPage, type, search, startDate, endDate);
  }, [location.search, handleFetchPayments]);


  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerSection}>
        {/* Payments Filter Form */}
        <PaymentsFilterForm
          type={type}
          dateRange={dateRange}
          onChangeType={handleChangePaymentType}
          onChangeDateRange={handleChangeDateRange}
        />

        {/* Payments Search Form */}
        <PaymentsSearchForm
          searched={new URLSearchParams(location.search).get("search") || ''}
          onSubmitSearch={(searchText) => {
              searchText ? navigate(`?search=${searchText}&page=1`) : navigate('?page=1');
          }}
          onClearSearch={() => {
              navigate('?page=1');
          }}
        />
      </Box>


      {/* Collections table */}
      <PaymentsTableSection
        payments={payments}
        loading={loading}
        page={pageDetails.pageIndex}
        onExportExcel={handleExportToExcel}
        totalPages={pageDetails.totalPages}
        onCancelPayment={handleCancelPayment}
        onOpenUpdatePaymentModal={handleOpenUpdatePaymentModal}
        onPageChange={(newPage) => {
            const params = new URLSearchParams(location.search);
            params.set('page', newPage);
            navigate(`?${params.toString()}`);
        }}
      />

      {/* Snackbar Alert */}
      <SnackbarAlert
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={message}
          severity={severity}
          duration={3000}
      />

      {/* Update Payment Form Modal */}
      <UpdatePaymentFormModal
        open={showUpdatePaymentModal}
        onClose={handleCloseUpdatePaymentModal}
        invoiceNumber={paymentDetails?.payment_invoice_number}
        clientName={paymentDetails?.payment_client_name}
        collectionToPay={paymentDetails?.payment_collection_amount}
        billingDate={paymentDetails?.payment_billing_date}
        invoiceCategory={paymentDetails?.payment_billing_cateogory}
        clientDepartmentAddress={paymentDetails?.payment_client_department_address}
        formValues={paymentDetails}
        onFormChange={handleChangePaymentDetails}
        onSubmit={handleSavePaymentDetails}
      />
    </Box>
  );
}

export default Page;