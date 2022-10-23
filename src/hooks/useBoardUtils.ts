import { useRecoilState } from 'recoil';
import * as utils from './boardEditUtils';
import { boardState } from '../recoil/atoms/board';
import { GameElement } from '../type';
import { useCallback } from 'react';

function useBoardUtils() {
  const [board, setBoard] = useRecoilState(boardState);

  const attachToGameElementById = useCallback(
    (gameElement: GameElement, parentId: string): void => {
      const updatedBoard = utils.attachToGameElementById(
        board,
        gameElement,
        parentId
      );
      setBoard(updatedBoard);
    },
    [board]
  );

  const removeGameElementById = useCallback(
    (id: string): GameElement => {
      const { removedElement, updatedBoard } = utils.removeGameElementById(
        board,
        id
      );
      setBoard(updatedBoard);
      return removedElement;
    },
    [board]
  );

  const replaceGameElement = useCallback(
    (id: string, parentId: string) => {
      // using utils instead of functions in this file to prevent board state from updating 2 times
      // uncomment when neccessary
      // if (!utils.isReplaceNecessary(board, id, parentId)) return board;

      let { removedElement, updatedBoard } = utils.removeGameElementById(
        board,
        id
      );
      updatedBoard = utils.attachToGameElementById(
        updatedBoard,
        removedElement,
        parentId
      );
      setBoard(updatedBoard);
    },
    [board]
  );

  const setGameElementProperties = useCallback(
    (id: string, properties: Partial<GameElement>) => {
      const updatedBoard = utils.setGameElementProperties(
        board,
        id,
        properties
      );
      setBoard(updatedBoard);
    },
    [board]
  );

  const findGameElementById = useCallback(
    (id: string) => {
      return utils.findGameElementById(board, id);
    },
    [board]
  );

  return {
    attachToGameElementById,
    removeGameElementById,
    replaceGameElement,
    setGameElementProperties,
    findGameElementById,
  };
}

export default useBoardUtils;
