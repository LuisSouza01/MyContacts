import React from 'react';

import APIError from '../../errors/APIError';

interface HttpClientProps {
  baseURL: string;
}

export class HttpClient extends React.Component<HttpClientProps, HttpClientProps> {
  constructor(props: HttpClientProps) {
    const { baseURL } = props;

    super(props);

    this.state = {
      baseURL,
    };
  }

  async get(path: String): Promise<any> {
    const { baseURL } = this.state;

    const response = await fetch(`${baseURL}${path}`);

    const contentType = response.headers.get('Content-Type');

    let body = null;

    if (!contentType?.includes('application/json')) {
      throw new APIError({ response, body });
    }

    body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new APIError({ response, body });
  }

  async post(path: String, body: any): Promise<any> {
    const { baseURL } = this.state;

    const response = await fetch(`${baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const contentType = response.headers.get('Content-Type');

    let responseBody = null;

    if (!contentType?.includes('application/json')) {
      throw new APIError({ response, body: responseBody });
    }

    responseBody = await response.json();

    if (response.ok) {
      return responseBody;
    }

    throw new APIError({ response, body: responseBody });
  }
}
