import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.50.102:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
