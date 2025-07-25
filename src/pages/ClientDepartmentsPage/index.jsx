// react
import { useEffect } from 'react';

// router
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// custom hook
import { useLogic } from './useLogic';

// section
import ClientDepartmentsTableSection from '@sections/ClientsSections/ClientDepartmentsTableSection';
import ClientSearchForm from '@sections/ClientsSections/ClientSearchForm';

// components
import SendEmailToClientsModal from '@components/clients/SendEmailToClientsModal';

const Page = () => {
  // id
  const { id } = useParams();

  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  //logic hook
  const {
    departments,
    loading,
    pageDetails,
    showEmailModal,
    selectedDepartmentIds,
    emailFormValues,
    handleFetchDepartments,
    handleUpdateClientStatus,
    handleSendEmail,
    handleEmailFormChange,
    handleOpenEmailModal,
    handleCloseEmailModal,
    handleSelectDepartmentIds
  } = useLogic();

  // use effect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const searchText = queryParams.get("search") || '';

    handleFetchDepartments(currentPage, searchText, id);
  }, [location.search, handleFetchDepartments]);

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
        <ClientDepartmentsTableSection
          loading={loading}
          selectedIds={selectedDepartmentIds}
          departments={departments}
          page={pageDetails.pageIndex}
          totalPages={pageDetails.totalPages}
          onSelectDepartmentIds={handleSelectDepartmentIds}
          onOpenEmailModal={handleOpenEmailModal}
          onPageChange={(newPage) => {
              const params = new URLSearchParams(location.search);
              params.set('page', newPage);
              navigate(`?${params.toString()}`);
          }}
          onStatusChange={handleUpdateClientStatus}
        />
  
        {/* Send Email Modal */}
        <SendEmailToClientsModal
          open={showEmailModal}
          emailFormValues={emailFormValues}
          onClose={handleCloseEmailModal}
          onSendEmail={handleSendEmail}
          onEmailFormChange={handleEmailFormChange}
        />
    </>
  );
};

export default Page;
