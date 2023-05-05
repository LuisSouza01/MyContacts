import React, {
  createRef, useCallback, useRef, useState,
} from 'react';

const useAnimatedList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const animatedRefs = useRef(new Map());

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  // const handleAnimationEnd = useCallback((id: number) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id));

  //   setPendingRemovalItemsIds(
  //     (prevState) => prevState.filter((itemId) => itemId !== id),
  //   );
  // }, []);

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

  // const animatedElementRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleAnimationEnd() {
  //     onAnimationEnd(id);
  //   }

  //   const elementRef = animatedElementRef.current;

  //   if (isLeaving) {
  //     elementRef?.addEventListener('animationend', handleAnimationEnd);
  //   }

  //   return () => {
  //     elementRef?.removeEventListener('animationend', handleAnimationEnd);
  //   };
  // }, [id, isLeaving, onAnimationEnd]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};

export default useAnimatedList;
