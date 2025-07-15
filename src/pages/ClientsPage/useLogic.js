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
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    totalRecords: 0,
    pageIndex: 1,
    totalPages: 0,
  });

  // callback functions

  // Function to fetch clients based on the page index
  const handleFetchClients = useCallback((pageIndex, searchedClient) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    dispatch(marga.client.getClientsAction({ 
      pageIndex, 
      pageSize: 10, 
      search: searchedClient 
    }))
      .then((res) => {
        if (res.success) {
          setClients(res.data.clients || []);
          setPageDetails({
            totalRecords: res.data.totalRecords || 0,
            pageIndex: res.data.pageIndex || 1,
            totalPages: res.data.totalPages || 0,
          });
        } else {
          console.error('Failed to fetch clients:', res.payload);
        }
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });
  }, [dispatch]);

  // Function to update the status of a client
  const handleUpdateClientStatus = useCallback((clientId, clientName, newStatus) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const payload = { 
      id: clientId, 
      client_name: clientName, 
      client_status: newStatus 
    };

    dispatch(marga.client.updateClientAction(payload))
      .then((res) => {
        if (res.success) {
          // Update the client list with the new status
          setClients((prevClients) =>
            prevClients.map((client) =>
              client.id === clientId ? { ...client, client_status: newStatus } : client
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
    clients,
    loading,
    pageDetails,
    handleFetchClients,
    handleUpdateClientStatus,
  };
};
