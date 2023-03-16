import React from 'react';

import { HttpClient } from './utils/HttpClient';
import { Category } from '../components/ContactForm';

interface CategoriesServiceProps {
  httpClient: HttpClient;
}

class CategoriesService extends React.Component<{}, CategoriesServiceProps> {
  constructor({}) {
    super({});

    this.state = {
      httpClient: new HttpClient({ baseURL: 'http://localhost:3001' }),
    };
  }

  async listCategories(): Promise<Category[]> {
    const { httpClient } = this.state;

    return httpClient.get('/categories');
  }
}

export default new CategoriesService({});
