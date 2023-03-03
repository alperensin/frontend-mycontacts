import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';
import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts', {
      method: 'GET',
    })
      .then(async (response) => {
        const json = await response.json();
        setContacts(json || []);
      })
      .catch(() => {
        // Error
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {' '}
          {contacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map(({
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
      </ListContainer>
    </Container>
  );
}
