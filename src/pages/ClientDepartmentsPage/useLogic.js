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
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    totalRecords: 0,
    pageIndex: 1,
    totalPages: 0,
  });

  // callback functions

  // Function to fetch departments based on the page index
  const handleFetchDepartments = useCallback((pageIndex, searchedClient, id) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    dispatch(marga.clientdepartment.getClientDepartmentsAction({ 
      pageIndex, 
      pageSize: 10, 
      search: searchedClient,
      clientId: id
    }))
      .then((res) => {
        if (res.success) {
          setDepartments(res.data.departments || []);
          setPageDetails({
            totalRecords: res.data.totalRecords || 0,
            pageIndex: res.data.pageIndex || 1,
            totalPages: res.data.totalPages || 0,
          });
        } else {
          console.error('Failed to fetch departments:', res.payload);
        }
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
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
      client_department_name: branchName, 
      client_department_address: branchAddress,
      client_department_client_id: branchParentId,
      client_department_status: newStatus 
    };

    dispatch(marga.clientdepartment.updateClientDepartmentAction(payload))
      .then((res) => {
        if (res.success) {
          // Update the client list with the new status
          setDepartments((prevClients) =>
            prevClients.map((client) =>
              client.id === branchId ? { ...client, client_department_status: newStatus } : client
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
    departments,
    loading,
    pageDetails,
    handleFetchDepartments,
    handleUpdateClientStatus
  };
};
