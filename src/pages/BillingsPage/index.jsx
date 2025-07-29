// react 
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// mui
import { Box, Typography } from '@mui/material';

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
        totalBillings,
        handleFetchBillings,
        handleMonthChange,
        handleYearChange,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const month = parseInt(queryParams.get("month")) || new Date().getMonth();
        const year = parseInt(queryParams.get("year")) || new Date().getFullYear();
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';

        handleFetchBillings(currentPage, month, year, search);
    }, [location.search, handleFetchBillings]);

    return (
        <>  
            {/* Header Section */}
            <Box sx={styles.headerSection}>
                {/* Month and Year Form Section */}
                <BillingsMonthAndYearForm
                    month={month}
                    year={year}
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
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
                totalBillings={totalBillings}
                totalPages={pageDetails.totalPages}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', newPage);
                    navigate(`?${params.toString()}`);
                }}
            />
        </>
    );
}

export default Page;

