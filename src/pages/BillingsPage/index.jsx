// react 
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box } from '@mui/material';

// styles
import styles from './styles';

// section
import BillingsTableSection from '@sections/BillingsSections/BillingsTableSection';
import BillingsMonthAndYearForm from '@sections/BillingsSections/BillingsMonthAndYearForm';
import BillingSearchForm from '@sections/BillingsSections/BillingSearchForm';



const Page = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks
    const {
        billings,
        loading,
        pageDetails,
        month,
        year,
        handleFetchBillings,
        handleMonthChange,
        handleYearChange,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const month = queryParams.get("month") || new Date().getMonth();
        const year = parseInt(queryParams.get("year")) || new Date().getFullYear();
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';

        handleFetchBillings(currentPage, month, year, search);
    }, [location.search, handleFetchBillings]);

    return (
        <>
            <Box sx={styles.headerSection}>
                {/* Month and Year Form Section */}
                <BillingsMonthAndYearForm
                    month={month}
                    year={year}
                    onMonthChange={(e) => handleMonthChange(e)}
                    onYearChange={(e) => handleYearChange(e)}
                />

                {/* Search Form Section */}
                <BillingSearchForm
                    searchedInvoice={new URLSearchParams(location.search).get("search") || ''}
                    onSubmitSearch={(searchText) => {
                        searchText ? navigate(`?search=${searchText}&page=1`) : navigate('?page=1');
                    }}
                    onClearSearch={() => {
                        navigate('?page=1');
                    }}
                />
            </Box>

            {/* Billings Table Section */}
            <BillingsTableSection
                loading={loading}
                billings={billings}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                onPageChange={(newPage) => navigate(`?page=${newPage}`)}
            />
        </>
    );
}

export default Page;

