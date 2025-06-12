// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// section
import ClientsTableSection from '@sections/ClientsSections/ClientsTableSection';
import ClientSearchForm from '@sections/ClientsSections/ClientSearchForm';


const Page = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // logic hooks
  const {
    clients,
    loading,
    pageDetails,
    handleFetchClients,
    handleUpdateClientStatus
  } = useLogic();

  // use effect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const searchText = queryParams.get("search") || '';

    handleFetchClients(currentPage, searchText);
  }, [location.search, handleFetchClients]);

  return (
    <>
        {/* Search Form Section */}
        <ClientSearchForm
          searchedClient={new URLSearchParams(location.search).get("search") || ''}
          onSubmitSearch={(searchText) => {
            searchText ? navigate(`?search=${searchText}&page=1`) : navigate('?page=1');
          }}
        />

        {/* Clients Table Section */}
        <ClientsTableSection
          loading={loading}
          clients={clients}
          page={pageDetails.pageIndex}
          totalPages={pageDetails.totalPages}
          onPageChange={(newPage) => navigate(`?page=${newPage}`)}
          onStatusChange={(clientId, clientName, newStatus) => {
            handleUpdateClientStatus(clientId, clientName, newStatus);
          }}
        />
  
    </>
  );
};

export default Page;
