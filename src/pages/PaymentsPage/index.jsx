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

// components
import SnackbarAlert from '@components/common/SnackbarAlert';


const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    payments,
    loading,
    type,
    pageDetails,
    openSnackbar,
    message,
    severity,
    setOpenSnackbar,
    handleFetchPayments,
    handleChangePaymentType,
    handleCancelPayment,
    handleExportToExcel
  } = useLogic();

  // use effect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("pageIndex")) || 1;
    const search = queryParams.get("search") || "";
    const type = queryParams.get("type") || "";

    handleFetchPayments(currentPage, type, search); 
  }, [location.search, handleChangePaymentType]);

  return (
    <Box sx={styles.root}>
      {/* Collections table */}
      <PaymentsTableSection
        payments={payments}
        loading={loading}
        page={pageDetails.pageIndex}
        onExportExcel={handleExportToExcel}
        totalPages={pageDetails.totalPages}
        onCancelPayment={handleCancelPayment}
        onPageChange={(event, value) => {
          navigate(`?pageIndex=${value}&type=${type}`);
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
    </Box>
  );
}

export default Page;