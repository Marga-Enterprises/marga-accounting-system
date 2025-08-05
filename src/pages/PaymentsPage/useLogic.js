// react
import { useState, useRef, useCallback } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

// XLSX
import * as XLSX from 'xlsx';

// file saver
import { saveAs } from 'file-saver';

// utils
import { capitalizeWords } from '@utils/methods';


export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // states
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    // callback functions


    // Function to fetch payments based on the page index and type
    const handleFetchPayments = useCallback((pageIndex, type, search) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch payments
        dispatch(marga.payment.getAllPaymentsAction({
            pageIndex,
            pageSize: 10,
            type: type || '',
            search: search || ''
        }))
            .then((res) => {
                if (res.success) {
                    setPayments(res.data.payments || []);
                    setType(type || '');
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.pageIndex || 1,
                        totalPages: res.data.totalPages || 0,
                    });
                    setType(type || '');
                } else {
                    console.error('Error fetching payments:', res.msg);
                }
            })
            .catch((err) => {
                console.error('Error fetching payments:', err);
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [dispatch]);

    // Function to handle change of payment type
    const handleChangePaymentType = useCallback((type) => {
        setType(type);
        
        setPageDetails((prev) => ({
            ...prev,
            pageIndex: 1,
        }));

        navigate(`?type=${type}&page=1`);
    }, [handleFetchPayments]);

    // Function to cancel payment

    const handleCancelPayment = useCallback((paymentId) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        dispatch(marga.payment.cancelPaymentAction({ id: paymentId }))
            .then((res) => {
                if (res.success) {
                    setOpenSnackbar(true);
                    setMessage(res.msg);
                    setSeverity('success');
                    handleFetchPayments(pageDetails.pageIndex, type);
                } else {
                    setOpenSnackbar(true);
                    setMessage(res.error || 'Failed to cancel payment');
                    setSeverity('error');
                }
            })
            .catch((err) => {
                setOpenSnackbar(true);
                setMessage(err.response?.data?.msg || 'Error cancelling payment');
                setSeverity('error');
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [dispatch]);

    // Function to export payments to Excel (DONT INCLUDE CANCELLED PAYMENTS)
    const handleExportToExcel = useCallback(() => {
        // Filter for cancelled payments only (optional)
        const filteredPayments = payments.filter(payment => !payment.payment_is_cancelled);

        // Transform data to match table headers
        const exportData = filteredPayments.map(payment => ({
            'Client': `${payment.payment_is_cancelled ? '(CANCELLED) ' : ''}${payment.collection?.billing?.department?.client_department_name || '-'}`,
            'Client TIN': payment.collection?.billing?.department?.client?.client_tin || '-',
            'Client Department Address': payment.collection?.billing?.department?.client_department_address || '-',
            'Invoice #': payment.payment_invoice_number || '-',
            'Date Paid': payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : '-',
            'Posting Date': payment.payment_posting_date ? new Date(payment.payment_posting_date).toLocaleDateString() : '-',
            'Collection Date': payment.payment_collection_date ? new Date(payment.payment_collection_date).toLocaleDateString() : '-',
            'OR #': payment.payment_or_number || '-',
            'Amount': payment.payment_amount ? `₱${parseFloat(payment.payment_amount).toFixed(2)}` : '-',
            'Payment Mode': payment.payment_mode ? capitalizeWords(payment.payment_mode) : '-',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'payments.xlsx');
    }, [payments]);

    // Return the necessary states and functions for use in the component
    return {
        payments,
        loading,
        type,
        pageDetails,
        openSnackbar,
        message,
        severity,
        setOpenSnackbar,
        handleFetchPayments,
        handleChangePaymentType,
        handleCancelPayment,
        handleExportToExcel
    };
};