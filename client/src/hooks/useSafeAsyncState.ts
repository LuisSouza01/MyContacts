import {
  useEffect, useState, useRef, useCallback,
} from 'react';

const useSafeAsyncState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data: any) => {
    if (isMounted.current) {
      setState(data);
    }
  }, []);

  return [state, setSafeAsyncState];
};

export default useSafeAsyncState;
