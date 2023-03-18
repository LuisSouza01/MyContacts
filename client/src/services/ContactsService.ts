import React from 'react';

import { Contact } from '../pages/Home';
import { NewContactFormData } from '../pages/NewContact';
import { HttpClient } from './utils/HttpClient';

interface ContactsServiceProps {
  httpClient: HttpClient;
}

class ContactsService extends React.Component<{}, ContactsServiceProps> {
  constructor({}) {
    super({});

    this.state = {
      httpClient: new HttpClient({ baseURL: 'http://localhost:3001' }),
    };
  }

  async listContacts(orderBy: string = 'asc'): Promise<Contact[]> {
    const { httpClient } = this.state;

    return httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contact: NewContactFormData): Promise<Contact> {
    const { httpClient } = this.state;

    return httpClient.post('/contacts', contact);
  }
}

export default new ContactsService({});
