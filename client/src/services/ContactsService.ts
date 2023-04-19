import React from 'react';

import { Contact } from '../pages/Home';
import { NewContactFormData } from '../pages/NewContact';
import { HttpClient } from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

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

  getContactById(id: string) {
    const { httpClient } = this.state;

    return httpClient.get(`/contacts/${id}`);
  }

  createContact(contact: NewContactFormData): Promise<Contact> {
    const { httpClient } = this.state;

    const body = ContactMapper.toPersistence(contact);

    return httpClient.post('/contacts', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  listContacts(orderBy: string = 'asc'): Promise<Contact[]> {
    const { httpClient } = this.state;

    return httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  updateContact(id: string, contact: NewContactFormData): Promise<Contact> {
    const { httpClient } = this.state;

    const body = ContactMapper.toPersistence(contact);

    return httpClient.put(`/contacts/${id}`, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new ContactsService({});
