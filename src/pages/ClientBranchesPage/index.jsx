// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// section
import ClientBranchesTableSection from '@sections/ClientsSections/ClientBranchesTableSection';
import ClientSearchForm from '@sections/ClientsSections/ClientSearchForm';


const Page = () => {
  // id
  const { id } = useParams();

  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  //logic hook
  const {
    branches,
    loading,
    pageDetails,
    handleFetchBranches,
    handleUpdateClientStatus
  } = useLogic();

  // use effect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const searchText = queryParams.get("search") || '';

    handleFetchBranches(currentPage, searchText, id);
  }, [location.search, handleFetchBranches]);

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
        <ClientBranchesTableSection
          loading={loading}
          branches={branches}
          page={pageDetails.pageIndex}
          totalPages={pageDetails.totalPages}
          onPageChange={(newPage) => navigate(`?page=${newPage}`)}
          onStatusChange={handleUpdateClientStatus}
        />
  
    </>
  );
};

export default Page;
