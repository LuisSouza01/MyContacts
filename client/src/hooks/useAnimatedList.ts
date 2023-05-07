import React, {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

const useAnimatedList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

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
      item: any, { isLeaving, animatedRef }: {
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
      const alredyHasListener = animationEndListeners.current.has(id);

      if (animatedRef?.current && !alredyHasListener) {
        animationEndListeners.current.set(id, true);

        animatedRef.current.addEventListener('animationend', () => {
          handleAnimationEnd(id);
        });
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};

export default useAnimatedList;
