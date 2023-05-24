import React, {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

type ItemType = {
  id: number;
  text: string;
  type?: 'default' | 'success' | 'danger';
  duration?: number;
}

const useAnimatedList = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id: number) => {
    const removeListener = animationEndListeners.current.get(id);
    removeListener();

    animatedRefs.current.delete(id);
    animationEndListeners.current.delete(id);

    setItems((prevState) => prevState.filter((item) => item.id !== id));

    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((
    renderItem: (
      // eslint-disable-next-line no-unused-vars
      item: ItemType, { isLeaving, animatedRef }: {
        isLeaving: boolean;
        animatedRef: React.RefObject<HTMLDivElement>
      }
    ) => React.ReactNode,
  ) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);

      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((id) => {
      const animatedRef = animatedRefs.current.get(id);
      const animatedElement = animatedRef?.current;
      const alredyHasListener = animationEndListeners.current.has(id);

      if (animatedElement && !alredyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(id);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animationEndListeners.current.set(id, removeListener);
        animatedElement.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};

export default useAnimatedList;
