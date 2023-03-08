import React from 'react';

interface HttpClientProps {
  baseURL: String;
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

    if (!contentType?.includes('application/json')) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new Error(body.error);
  }
}
