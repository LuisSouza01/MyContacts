import React from 'react';

import { NewContactFormData } from '../pages/NewContact/useNewContact';
import { HttpClient } from './utils/HttpClient';
import ContactMapper, { ContactDomainMapper } from './mappers/ContactMapper';

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

  async getContactById(id: string): Promise<ContactDomainMapper> {
    const { httpClient } = this.state;

    const contact = await httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  async createContact(contact: NewContactFormData): Promise<ContactDomainMapper> {
    const { httpClient } = this.state;

    const body = ContactMapper.toPersistence(contact);

    const response = await httpClient.post('/contacts', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return ContactMapper.toDomain(response);
  }

  async listContacts(orderBy: string = 'asc'): Promise<ContactDomainMapper[]> {
    const { httpClient } = this.state;

    const contacts = await httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async updateContact(id: string, contact: NewContactFormData): Promise<ContactDomainMapper> {
    const { httpClient } = this.state;

    const body = ContactMapper.toPersistence(contact);

    const response = await httpClient.put(`/contacts/${id}`, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return ContactMapper.toDomain(response);
  }

  async deleteContact(id: string) {
    const { httpClient } = this.state;

    await httpClient.delete(`/contacts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new ContactsService({});
