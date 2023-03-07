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

    return response.json();
  }
}
