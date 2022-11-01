import { useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { GameElement } from '../type';
import useBoardUtils from './useBoardUtils';

function useHandleDradEnd() {
  const { findGameElementById, setGameElementProperties, replaceGameElement } =
    useBoardUtils();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const draggedId = event.active.id as string;
      const droppedId = event.over?.id as string;

      if (!droppedId) return;

      const draggedElement: GameElement = findGameElementById(draggedId);

      const { x: dx, y: dy } = event.delta;
      const { x, y } = draggedElement.coordinates;

      // FIX THIS:
      // currently, cannot execute setGameElementProperties & replaceGameElement
      // at the same time, because both functions have board state changes so the latter one will not work
      setGameElementProperties(draggedId, {
        coordinates: { x: x + dx, y: y + dy },
      });

      // replaceGameElement(draggedId, droppedId);
    },
    [findGameElementById, setGameElementProperties, replaceGameElement]
  );

  return {
    handleDragEnd,
  };
}

export default useHandleDradEnd;
