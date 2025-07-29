// react
import { useState, useRef, useCallback, use } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [collections, setCollections] = useState([]);
    const [openPayCollectionModal, setOpenPayCollectionModal] = useState(false);
    const [status, setStatus] = useState('pending');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [dateRange, setDateRange] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableFormat, setTableFormat] = useState('all');
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });
    const [formValues, setFormValues] = useState({
        payment_collection_id: '',
        payment_or_number: '',
        payment_or_number: '',
        payment_amount: '',
        payment_mode: 'cash',
        payment_remarks: '',
        payment_cheque_number: '',
        payment_cheque_date: '',
        payment_online_transfer_reference_number: '',
        payment_online_transfer_date: '',
    });

    // callback functions


    // Function to fetch collections based on the page index and search term
    const handleFetchCollections = useCallback((pageIndex, search, status, dateRange) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch collections
        dispatch(marga.collection.getCollectionsAction({ 
            pageIndex, 
            pageSize: 10,
            search: search || '',
            status: status || '',
            dateRange: dateRange || ''
        }))
            .then((res) => {
                if (res.success) {
                    setCollections(res.data.collections || []);
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.pageIndex || 1,
                        totalPages: res.data.totalPages || 0,
                    })
                } else {
                    console.error('Failed to fetch collections:', res.payload);
                }
            })
            .catch((error) => {
                console.error('Error fetching collections:', error);
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [dispatch])

    // handle change function for status and date range
    const handleChangeStatus = useCallback((status) => {
        setStatus(status);
        setDateRange('');

        setPageDetails((prev) => ({
            ...prev,
            pageIndex: 1,
        }));

        navigate(`?status=${status}&page=1`);
    }, [handleFetchCollections]);

    const handleChangeDateRange = useCallback((dateRange) => {
        setDateRange(dateRange);
        setStatus('');

        setPageDetails((prev) => ({
            ...prev,
            pageIndex: 1,
        }));

        navigate(`?dateRange=${dateRange}&page=1`);
    },[handleFetchCollections]);

    // function to handle table format change
    const handleChangeTableFormat = useCallback((format) => {
        setTableFormat(format);
    }, []);

    // handle form values change
    const handleFormValuesChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // handle save payment for collection
    const handleSavePayment = useCallback((e) => {
        e.preventDefault();

        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to create payment
        dispatch(marga.payment.createPaymentAction(formValues))
            .then((res) => {
                if (res.success) {
                    setOpenPayCollectionModal(false);
                    setFormValues({
                        payment_collection_id: '',
                        payment_or_number: '',
                        payment_amount: '',
                        payment_mode: 'cash',
                        payment_remarks: '',
                        payment_cheque_number: '',
                        payment_cheque_date: '',
                        payment_cheque_bank_name: '',
                        payment_online_transfer_reference_number: '',
                        payment_online_transfer_bank_name: '',
                        payment_online_transfer_date: ''
                    });

                    // remove the payment from the collections list
                    setCollections((prev) => prev.filter((collection) => collection.id !== formValues.payment_collection_id));
                    setOpenSnackbar(true);
                    setMessage(res.msg);
                    setSeverity('success');
                } else {
                    setOpenSnackbar(true);
                    setMessage(res.error);
                    setSeverity('error');
                }
            })
            .catch((error) => {
                console.error('Error creating payment:', error);
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [dispatch, formValues]);

    // handle open/close modal
    const handleOpenPayCollectionModal = useCallback((id) => {
        setOpenPayCollectionModal(true);
        setFormValues((prev) => ({
            ...prev,
            payment_collection_id: id,
        }));
    }, []);

    const handleClosePayCollectionModal = useCallback(() => {
        setOpenPayCollectionModal(false);
    }, []);

    // Return the necessary states and functions for use in the component
    return {
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
        setOpenSnackbar,
        handleFetchCollections,
        handleChangeStatus,
        handleChangeDateRange,
        handleChangeTableFormat,
        handleFormValuesChange,
        handleSavePayment,
        handleOpenPayCollectionModal,
        handleClosePayCollectionModal,
    };
};