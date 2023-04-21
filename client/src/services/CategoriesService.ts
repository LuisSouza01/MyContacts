import React from 'react';

import { HttpClient } from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

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

  async listCategories() {
    const { httpClient } = this.state;

    const categories = await httpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService({});
