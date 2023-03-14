import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.50.102:3001');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });
    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });
    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body });
  }

  async updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    const contactData = await this.httpClient.put(`/contacts/${id}`, { body });
    return ContactMapper.toDomain(contactData);
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
