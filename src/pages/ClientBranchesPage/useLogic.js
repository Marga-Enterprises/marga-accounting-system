// react
import { useState, useRef, useCallback } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

export const useLogic = () => {
  // hooks
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  // states
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    totalRecords: 0,
    pageIndex: 1,
    totalPages: 0,
  });

  // callback functions

  // Function to fetch branches based on the page index
  const handleFetchBranches = useCallback((pageIndex, searchedClient, id) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    dispatch(marga.clientbranch.getClientBranchesAction({ 
      pageIndex, 
      pageSize: 10, 
      search: searchedClient,
      clientId: id
    }))
      .then((res) => {
        if (res.success) {
          setBranches(res.data.branches || []);
          setPageDetails({
            totalRecords: res.data.totalRecords || 0,
            pageIndex: res.data.pageIndex || 1,
            totalPages: res.data.totalPages || 0,
          });
        } else {
          console.error('Failed to fetch branches:', res.payload);
        }
      })
      .catch((error) => {
        console.error('Error fetching branches:', error);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });
  }, [dispatch]);

  // Function to update the status of a client
  const handleUpdateClientStatus = useCallback((
    branchId, 
    branchName, 
    branchAddress, 
    branchParentId,
    newStatus
  ) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const payload = { 
      id: branchId, 
      client_branch_name: branchName, 
      client_branch_address: branchAddress,
      client_branch_client_id: branchParentId,
      client_branch_status: newStatus 
    };

    dispatch(marga.clientbranch.updateClientBranchAction(payload))
      .then((res) => {
        if (res.success) {
          // Update the client list with the new status
          setBranches((prevClients) =>
            prevClients.map((client) =>
              client.id === branchId ? { ...client, client_branch_status: newStatus } : client
            )
          );
        } else {
          console.error('Failed to update client status:', res.payload);
        }
      })
      .catch((error) => {
        console.error('Error updating client status:', error);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });
  }, [dispatch]);

  // Return the necessary states and functions for use in the component
  return {
    branches,
    loading,
    pageDetails,
    handleFetchBranches,
    handleUpdateClientStatus
  };
};
