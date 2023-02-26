import { useState } from 'react';

type Errors = {
  field: string;
  message: string;
}

const useErrors = () => {
  const [errors, setErrors] = useState<Errors[]>([]);

  function setError({ field, message }: { field: string, message: string}) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, {
      field, message,
    }]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrrorMessageByFieldName,
  };
};

export default useErrors;
