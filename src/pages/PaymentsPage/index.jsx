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


const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    payments,
    loading,
    pageDetails,
    type,
    handleFetchPayments,
    handleChangePaymentType,
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
      <PaymentsTableSection
        payments={payments}
        loading={loading}
        page={pageDetails.pageIndex}
        totalPages={pageDetails.totalPages}
        onPageChange={(event, value) => {
          navigate(`?pageIndex=${value}&type=${type}`);
        }}
      />
    </Box>
  );
}

export default Page;