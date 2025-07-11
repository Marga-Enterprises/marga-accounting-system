// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook for machines logic
import { useLogicMachines } from './useLogicMachines';

// sections
import MachinesTableSection from '@sections/ServicesSections/MachinesTableSection';
import MachineSearchForm from '@sections/ServicesSections/MachineSearchForm';

// components
import EditMachineModal from '@components/services/EditMachineModal';

const Page = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();

    // logic hooks for machines
    const {
        machines,
        loading,
        pageDetails,
        openEditMachineModal,
        formValues,
        handleChangeFormValues,
        handleFetchMachines,
        handleUpdateMachineStatus,
        handleUpdateMachine,
        handleFetchMachine,
        handleCloseEditMachineModal
    } = useLogicMachines();

    // use effect to fetch machines on component mount or location change
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;
        const searchText = queryParams.get("search") || '';

        // Fetch machines based on the current page
        handleFetchMachines(currentPage, searchText);
    }, [location.search, handleFetchMachines]);

    return (
        <>
            {/* Machine Search Form Section */}
            <MachineSearchForm
                searchedMachine={new URLSearchParams(location.search).get('search') || ''}
                onSubmitSearch={(searchText) => {
                    searchText ? navigate(`?search=${searchText}&page=1`) : navigate('?page=1');
                }}
            />

            {/* Machines Table Section */}
            <MachinesTableSection
                machines={machines}
                loading={loading}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                onStatusChange={handleUpdateMachineStatus}
                onFetchMachine={handleFetchMachine}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', newPage);
                    navigate(`?${params.toString()}`);
                }}
            />

            {/* Edit Machine Modal */}
            <EditMachineModal
                open={openEditMachineModal}
                formValues={formValues}
                onChange={handleChangeFormValues}
                onClose={handleCloseEditMachineModal}
                onSendUpdate={(e) => handleUpdateMachine(e)}
            />
        </>
    );
}

export default Page;