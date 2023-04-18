import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

const useSafeAsyncAction = () => {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callback: () => void) => {
    if (isMounted()) {
      callback();
    }
  }, [isMounted]);

  return runSafeAsyncAction;
};

export default useSafeAsyncAction;
