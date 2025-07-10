// react 
import { useState, useCallback, useRef } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

export const useLogicMachines = () => {
    // hooks 
    const dispatch = useDispatch();
    const loadingRef = useRef(null);

    // states
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEditMachineModal, setOpenEditMachineModal] = useState(false);
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });
    const [formValues, setFormValues] = useState({
        machine_brand: '',
        machine_model: '',
        machine_description: '',
        machine_serial_number: '',
    });

    // callback functions

    // Function to fetch machines based on the page index
    const handleFetchMachines = useCallback((pageIndex) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch machines
        dispatch(marga.machine.getMachinesAction({
            pageIndex,
            pageSize: 10,
        }))
            .then((res) => {
                if (res.success) {
                    setMachines(res.data.machines || []);
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.pageIndex || 1,
                        totalPages: res.data.totalPages || 0,
                    });
                } else {
                    console.error("Failed to fetch machines:", res.payload);
                }
            })
            .catch((error) => {
                console.error("Error fetching machines:", error);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch]);

    // Function to handle status change of a machine
    const handleUpdateMachine = useCallback((machineId, newStatus) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        const payload = {
            id: machineId,
            machine_status: newStatus,
        };

        // Dispatch the action to update machine status
        dispatch(marga.machine.updateMachineAction(payload))
            .then((res) => {
                if (res.success) {
                    // Update the local state with the new status
                    setMachines((prevMachines) =>
                        prevMachines.map((machine) =>
                            machine.id === machineId
                                ? { ...machine, machine_status: newStatus }
                                : machine
                        )
                    );
                    setOpenEditMachineModal(prevState => prevState ? false : prevState);
                    setFormValues({
                        machine_brand: '',
                        machine_model: '',
                        machine_description: '',
                        machine_serial_number: '',
                    });
                } else {
                    console.error("Failed to update machine status:", res.payload);
                }
            })
            .catch((error) => {
                console.error("Error updating machine status:", error);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch]);

    // Function to fetch a specific machine by ID
    const handleFetchMachine = useCallback((machineId) => {
        setOpenEditMachineModal(true);

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        const payload = {
            id: machineId,
        };

        // Dispatch the action to fetch a specific machine
        dispatch(marga.machine.getMachineAction(payload))
            .then((res) => {
                if (res.success) {
                    const machine = res.data || {};
                    setFormValues({
                        machine_brand: machine.machine_brand || '',
                        machine_model: machine.machine_model || '',
                        machine_description: machine.machine_description || '',
                        machine_serial_number: machine.machine_serial_number || '',
                    });
                } else {
                    console.error("Failed to fetch machine:", res.payload);
                }
            })
            .catch((error) => {
                console.error("Error fetching machine:", error);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch]);

    // Function to handle form value changes
    const handleChangeFormValues = useCallback((event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);

    // handle close modals
    const handleCloseEditMachineModal = useCallback(() => {
        setOpenEditMachineModal(false);
    }, []);

    return {
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
    };
};