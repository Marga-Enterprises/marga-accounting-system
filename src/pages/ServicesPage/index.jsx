// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook for machines logic
import { useLogicMachines } from './useLogicMachines';

// sections
import MachinesTableSection from '@sections/ServicesSections/MachinesTableSection';

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
        handleUpdateMachine,
        handleFetchMachine,
        handleCloseEditMachineModal
    } = useLogicMachines();

    // use effect to fetch machines on component mount or location change
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get("page")) || 1;

        // Fetch machines based on the current page
        handleFetchMachines(currentPage);
    }, [location.search, handleFetchMachines]);

    return (
        <>
            {/* Machines Table Section */}
            <MachinesTableSection
                machines={machines}
                loading={loading}
                page={pageDetails.pageIndex}
                totalPages={pageDetails.totalPages}
                onStatusChange={handleUpdateMachine}
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
                onSendUpdate={handleUpdateMachine}
            />
        </>
    );
}

export default Page;