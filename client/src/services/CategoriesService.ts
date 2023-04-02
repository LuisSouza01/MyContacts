import React from 'react';

import { HttpClient } from './utils/HttpClient';

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

  listCategories() {
    const { httpClient } = this.state;

    return httpClient.get('/categories');
  }
}

export default new CategoriesService({});
