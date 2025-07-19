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
    const [collections, setCollections] = useState([]);
    const [status, setStatus] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageDetails, setPageDetails] = useState({
        totalRecords: 0,
        pageIndex: 1,
        totalPages: 0,
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

    // Return the necessary states and functions for use in the component
    return {
        collections,
        loading,
        pageDetails,
        status,
        dateRange,
        handleFetchCollections,
        handleChangeStatus,
        handleChangeDateRange,
    };
};