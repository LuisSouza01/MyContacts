import { useCallback, useState } from 'react';
import { MessageType } from '../components/Toast/ToastContainer';

const useAnimatedList = () => {
  const [items, setItems] = useState<MessageType[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id: number) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));

    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
};

export default useAnimatedList;
