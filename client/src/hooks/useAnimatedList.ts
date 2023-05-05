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

  // eslint-disable-next-line no-unused-vars
  const renderList = useCallback((renderItem: (list: any) => any) => (
    items.map(renderItem)
  ), [items]);

  items.map((element) => element.id === 2);

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  };
};

export default useAnimatedList;
