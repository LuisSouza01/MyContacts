import { Contact } from '../pages/Home';

class ContactsService {
  async listContacts(orderBy: string = 'asc'): Promise<Contact[]> {
    const response = await fetch(
      `http://localhost:3001/contacts?orderBy=${orderBy}`,
    );

    return response.json();
  }
}

export default new ContactsService();
