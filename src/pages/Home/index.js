import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { Container } from './styles';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

import useHome from './useHome';

export default function Home() {
  const {
    contacts,
    filteredContacts,
    contactBeingDeleted,
    searchTerm,
    orderBy,
    hasError,
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    handleToggleOrderBy,
    handleTryAgain,
    handleChangeSearchTerm,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearch
        value={searchTerm}
        onChange={handleChangeSearchTerm}
        isVisible={contacts.length > 0}
      />

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      <ErrorStatus isVisible={hasError} onTryAgain={handleTryAgain} />

      {!hasError && (
        <>
          {
            (contacts.length < 1 && !isLoading) && (
              <EmptyList />
            )
          }

          {
            (contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFound searchTerm={searchTerm} />
            )
          }

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
          >
            <p>
              Esta ação nao poderá ser desfeita!
            </p>
          </Modal>
        </>
      )}
    </Container>
  );
}
