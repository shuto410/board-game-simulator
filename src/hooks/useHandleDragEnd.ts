import { useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { GameElement } from '../type';
import useBoardUtils from './useBoardUtils';
import { boardState } from '../recoil/atoms/board';
import { useRecoilState } from 'recoil';

function useHandleDragEnd() {
  const [board, setBoard] = useRecoilState(boardState);

  const { findGameElementById, setGameElementProperties, replaceGameElement } =
    useBoardUtils();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const draggedId = event.active.id as string;

      const draggedElement: GameElement = findGameElementById(draggedId);

      const { x: dx, y: dy } = event.delta;
      const { x, y } = draggedElement.coordinates;

      const newCoordinates = { x: x + dx, y: y + dy };
      // TODO:
      // Might want little more validation e.g. screen size
      if (!isElementWithinBoardBounds(newCoordinates, draggedElement)) return;

      // FIX THIS:
      // currently, cannot execute setGameElementProperties & replaceGameElement
      // at the same time, because both functions have board state changes so the latter one will not work
      setGameElementProperties(draggedId, {
        coordinates: newCoordinates,
      });

      // replaceGameElement(draggedId, droppedId);
    },
    [findGameElementById, setGameElementProperties, replaceGameElement]
  );

  const isElementWithinBoardBounds = (
    coordinates: { x: number; y: number },
    element: GameElement
  ) => {
    const { width, height } = board.size;
    return (
      0 <= coordinates.x &&
      coordinates.x + element.size.width <= width &&
      0 <= coordinates.y &&
      coordinates.y + element.size.height <= height
    );
  };

  return {
    handleDragEnd,
  };
}

export default useHandleDragEnd;
