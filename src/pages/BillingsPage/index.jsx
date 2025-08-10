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

// components
import UnbilledDepartmentsModal from '@components/billing/UnbilledDepartmentsModal';


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
        totalBilledDepartments,
        totalDepartments,
        unbilledDepartments,
        openUnbilledDepartmentsModal,
        handleFetchBillings,
        handleMonthChange,
        handleYearChange,
        handleShowUnbilledDepartmentsModal,
        handleCloseUnbilledDepartmentsModal
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
                month={month}
                year={year}
                onOpenUnbilledDepartmentsModal={handleShowUnbilledDepartmentsModal}
                billings={billings}
                page={pageDetails.pageIndex}
                totalBillings={totalBillings}
                totalBilledDepartments={totalBilledDepartments}
                totalDepartments={totalDepartments}
                totalPages={pageDetails.totalPages}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', newPage);
                    navigate(`?${params.toString()}`);
                }}
            />

            {/* Unbilled Departments Modal */}
            <UnbilledDepartmentsModal
                open={openUnbilledDepartmentsModal}
                onClose={handleCloseUnbilledDepartmentsModal}
                unbilledDepartments={unbilledDepartments}
            />
        </>
    );
}

export default Page;

