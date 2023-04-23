import { useCallback, useState } from 'react';

type Errors = {
  field: string;
  message: string;
}

const useErrors = () => {
  const [errors, setErrors] = useState<Errors[]>([]);

  const setError = useCallback(({ field, message }: { field: string, message: string}) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, {
      field, message,
    }]);
  }, [errors]);

  const removeError = useCallback((fieldName: string) => {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }, []);

  const getErrrorMessageByFieldName = useCallback((fieldName: string) => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrrorMessageByFieldName,
  };
};

export default useErrors;
