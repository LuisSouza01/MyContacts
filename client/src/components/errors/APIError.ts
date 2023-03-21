interface APIErrorProps {
  response: Response;
  body: any;
  responseBody?: any;
}

class APIError extends Error {
  constructor(props: APIErrorProps) {
    const { response, body } = props;

    super();

    this.name = 'APIError';

    this.message = body.error || `${response.status} - ${response.statusText}`;
  }
}

export default APIError;
