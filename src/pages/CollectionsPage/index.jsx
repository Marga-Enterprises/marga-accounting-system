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

// sections
import CollectionsTableSection from '@sections/CollectionsSections/CollectionsTableSection';
import CollectionsTableSectionAgeFormatSection from '@sections/CollectionsSections/CollectionsTableAgeFormatSection';
import CollectionsSearchForm from '@sections/CollectionsSections/CollectionsSearchForm';
import CollectionsFiltersForm from '@sections/CollectionsSections/CollectionsFiltersForm';
import CollectionsTableFormatForm from '@sections/CollectionsSections/CollectionsTableFormatForm';

// components
import PayCollectionFormModal from '@components/collections/PayCollectionFormModal';
import SnackbarAlert from '@components/common/SnackbarAlert';

const Page = () => {
    //hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks
    const {
        collections,
        loading,
        pageDetails,
        status,
        dateRange,
        tableFormat,
        openPayCollectionModal,
        formValues,
        openSnackbar,
        message,
        severity,
        totalCollectionsAmount,
        setOpenSnackbar,
        handleFetchCollections,
        handleChangeStatus,
        handleChangeDateRange,
        handleChangeTableFormat,
        handleFormValuesChange,
        handleSavePayment,
        handleOpenPayCollectionModal,
        handleClosePayCollectionModal,
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';
        const status = queryParams.get("status") || 'pending';
        const dateRange = queryParams.get("dateRange") || '';

        handleFetchCollections(currentPage, search, status, dateRange);
    }, [location.search, handleFetchCollections]);

    return (
        <>
            {/* Search Form Section */}
            <Box sx={styles.headerSection}>
                {/* Filters Form Section */}
                <CollectionsFiltersForm
                    dateRange={dateRange}
                    status={status}
                    onChangeStatus={handleChangeStatus}
                    onChangeDateRange={handleChangeDateRange}
                />
                
                {/* Table Format Form Section */}
                <CollectionsTableFormatForm
                    format={tableFormat}
                    onChangeTableFormat={handleChangeTableFormat}
                />

                {/* Search Form Section */}
                <CollectionsSearchForm
                    searchedInvoice={new URLSearchParams(location.search).get("search") || ''}
                    onSubmitSearch={(searchText) => {
                        searchText ? navigate(`?search=${searchText}&page=1`) : navigate('?page=1');
                    }}
                    onClearSearch={() => {
                        navigate('?page=1');
                    }}
                />
            </Box>

            {/* Collections Table Section */}
            {
                tableFormat === 'all' ? (
                    <CollectionsTableSection
                        loading={loading}
                        totalCollections={totalCollectionsAmount}
                        onOpenPaymentModal={handleOpenPayCollectionModal}
                        collections={collections}
                        page={pageDetails.pageIndex}
                        totalPages={pageDetails.totalPages}
                        onPageChange={(newPage) => {
                            const params = new URLSearchParams(location.search);
                            params.set('page', newPage);
                            navigate(`?${params.toString()}`);
                        }}
                    />
                ) : (
                    <CollectionsTableSectionAgeFormatSection
                        loading={loading}
                        onOpenPaymentModal={handleOpenPayCollectionModal}
                        totalCollections={totalCollectionsAmount}
                        collections={collections}
                        page={pageDetails.pageIndex}
                        totalPages={pageDetails.totalPages}
                        onPageChange={(newPage) => {
                            const params = new URLSearchParams(location.search);
                            params.set('page', newPage);
                            navigate(`?${params.toString()}`);
                        }}
                    />
                )
            }

            {/* Pay Collection Modal */}
            <PayCollectionFormModal
                open={openPayCollectionModal}
                onClose={handleClosePayCollectionModal}
                onSubmit={handleSavePayment}
                onFormChange={handleFormValuesChange}
                formValues={formValues}
            />

            {/* Snackbar Alert */}
            <SnackbarAlert
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={message}
                severity={severity}
                duration={3000}
            />
        </>
    )
}

export default Page;
