// react
import { useState, useRef, useCallback } from 'react';

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
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

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

    // Return the necessary states and functions for use in the component
    return {
        payments,
        loading,
        type,
        pageDetails,
        handleFetchPayments,
        handleChangePaymentType,
    };
};