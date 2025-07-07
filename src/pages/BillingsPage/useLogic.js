// react 
import { useState, useRef, useCallback } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

// react-router
import { useNavigate } from 'react-router-dom';

// utils
import { convertMonthToName } from '@utils/methods';

export const useLogic = () => {
    // hooks
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const navigate = useNavigate();

    // fixed values
    const monthNow = new Date().getMonth();
    const yearNow = new Date().getFullYear();

    // states
    const [billings, setBillings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(monthNow);
    const [year, setYear] = useState(yearNow);
    const [totalBillings, setTotalBillings] = useState(0);
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
    });

    // callback functions

    // Function to fetch billings based on the page index
    const handleFetchBillings = useCallback((pageIndex, billingMonth, billingYear, search) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        // Dispatch the action to fetch billings
        dispatch(marga.billing.getBillingsAction({ 
            pageIndex, 
            pageSize: 10,
            search: search || '',
            billingMonth: convertMonthToName(billingMonth),
            billingYear: billingYear, 
        }))
            .then((res) => {
                if (res.success) {
                    setBillings(res.data.billings || []);
                    setPageDetails({
                        totalRecords: res.data.totalRecords || 0,
                        pageIndex: res.data.pageIndex || 1,
                        totalPages: res.data.totalPages || 0,
                    });
                    setTotalBillings(res.data.totalBillingForMonth || 0);
                } else {
                    console.error('Failed to fetch billings:', res.payload);
                }
            })
            .catch((error) => {
                console.error('Error fetching billings:', error);
            })
            .finally(() => {
                setLoading(false);
                loadingRef.current = false;
            });
    }, [dispatch]);

    // Function to handle month change
    const handleMonthChange = useCallback((newMonth) => {
        setMonth(newMonth);
        setPageDetails((prev) => ({
            ...prev,
            pageIndex: 1,
        }));

        // Fetch billings for the new month and current year
        navigate(`?month=${newMonth}&year=${year}&page=1`);
        handleFetchBillings(1, newMonth, year);
    }, [handleFetchBillings, year]);

    // Function to handle year change
    const handleYearChange = useCallback((newYear) => {
        setYear(newYear);
        setPageDetails((prev) => ({
            ...prev,
            pageIndex: 1,
        }));

        // Fetch billings for the current month and new year
        navigate(`?month=${month}&year=${newYear}&page=1`);
        handleFetchBillings(1, month, newYear);
    }, [handleFetchBillings, month]);

    // Return the necessary states and functions for use in the component
    return {
        billings,
        loading,
        pageDetails,
        month,
        year,
        totalBillings,
        handleFetchBillings,
        handleMonthChange,
        handleYearChange,
    };
};

