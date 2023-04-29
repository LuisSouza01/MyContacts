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

  get(path: string, options: any = {}): Promise<any> {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path: string, options: any): Promise<any> {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path: string, options: any): Promise<any> {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path: string, options: any): Promise<any> {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path: string, options: any) {
    const { baseURL } = this.state;

    const headers = new Headers();

    if (options.body) {
      Object.keys(options.headers).forEach((name) => {
        headers.append(name, options.headers[name]);
      });
    }

    const response = await fetch(`${baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
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
