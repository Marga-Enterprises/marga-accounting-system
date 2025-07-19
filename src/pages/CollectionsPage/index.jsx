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
import CollectionsSearchForm from '@sections/CollectionsSections/CollectionsSearchForm';
import CollectionsFiltersForm from '@sections/CollectionsSections/CollectionsFiltersForm';

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
        handleFetchCollections,
        handleChangeStatus,
        handleChangeDateRange
    } = useLogic();

    // use effect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const currentPage = parseInt(queryParams.get("page")) || 1;
        const search = queryParams.get("search") || '';
        const status = queryParams.get("status") || '';
        const dateRange = queryParams.get("dateRange") || '';

        handleFetchCollections(currentPage, search, status, dateRange);
    }, [location.search, location.status, location.dateRange, handleFetchCollections]);

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
            <CollectionsTableSection
                loading={loading}
                collections={collections}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', newPage);
                    navigate(`?${params.toString()}`);
                }}
            />
        </>
    )
}

export default Page;
