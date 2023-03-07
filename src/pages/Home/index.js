import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';
import formatPhone from '../../utils/formatPhone';
import Loader from '../../components/Loader';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    setIsLoading(true);

    async function loadContacts() {
      try {
        const response = await fetch(`http://192.168.50.102:3001/contacts?orderBy=${orderBy}`);
        const json = await response.json();
        setContacts(json || []);
      } catch (error) {
        // Error
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input value={searchTerm} onChange={handleChangeSearchTerm} type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {
        filteredContacts.length > 0
        && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
        )
      }

      {filteredContacts.map(({
        id, name, category_name: categoryName, email, phone,
      }) => (
        <Card key={id}>
          <div className="info">
            <div className="contact-name">
              <strong>{name}</strong>
              {categoryName && <small>{categoryName}</small>}
            </div>
            <span>{email}</span>
            <span>{formatPhone(phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
