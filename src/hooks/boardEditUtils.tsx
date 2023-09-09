import { GameElement } from '../type';

export const findGameElementById = (
  board: GameElement,
  id: string
): GameElement => {
  console.log(id);
  if (board.id === id) return board;

  const foundElements = board.childElements
    ?.map((gameElement) => {
      return findGameElementChildById(gameElement, id);
    })
    .filter((ge): ge is GameElement => ge !== undefined);

  if (!foundElements || !foundElements.length)
    throw new Error('invalid id or state');

  return foundElements[0];
};

export const attachToGameElementById = (
  board: GameElement,
  gameElement: GameElement,
  parentId: string
): GameElement => {
  const parentGameElement = findGameElementById(board, parentId);
  // TODO: need to check whether child game element is attachable to parent game element

  // add the parent id when attaching
  const updatedParentGameElement = {
    ...parentGameElement,
    childElements: [
      ...(parentGameElement.childElements ?? []),
      {
        ...gameElement,
        parent: parentId,
      },
    ],
  };

  return updateGameElementById(board, updatedParentGameElement, parentId);
};

export const removeGameElementById = (
  board: GameElement,
  id: string
): {
  removedElement: GameElement;
  updatedBoard: GameElement;
} => {
  const targetGameElement = findGameElementById(board, id);
  const parentGameElement = findGameElementById(
    board,
    targetGameElement.parentId as string
  );
  const updatedParentGameElement = {
    ...parentGameElement,
    childElements: parentGameElement.childElements?.filter(
      (gameElement) => gameElement.id !== targetGameElement.id
    ),
  };

  const updatedBoard = updateGameElementById(
    board,
    updatedParentGameElement,
    updatedParentGameElement.id as string
  );
  return {
    removedElement: targetGameElement,
    updatedBoard: updatedBoard,
  };
};

export const updateGameElementById = (
  board: GameElement,
  newGameElement: GameElement,
  id: string
): GameElement => {
  if (board.id === id) return newGameElement;
  const updatedBoard = {
    ...board,
    childElements: board.childElements?.map((gameElement) =>
      updateGameElementById(gameElement, newGameElement, id)
    ),
  };
  return updatedBoard;
};

export const setGameElementProperties = (
  board: GameElement,
  id: string,
  properties: Partial<GameElement>
) => {
  const gameElement = findGameElementById(board, id);

  const updatedGameElement = {
    ...gameElement,
    ...properties,
  };
  return updateGameElementById(board, updatedGameElement, id);
};

export const isReplaceNecessary = (
  board: GameElement,
  id: string,
  parentId: string
) => {
  const gameElement = findGameElementById(board, id);
  return gameElement.parentId !== parentId;
};

// helper to make findGameElementById return GameElement and not undefined
const findGameElementChildById = (
  board: GameElement | undefined,
  id: string
): GameElement | undefined => {
  if (!board) return;
  if (board.id === id) return board;
  return board.childElements
    ?.map((gameElement) => {
      return gameElement.id === id
        ? gameElement
        : findGameElementChildById(gameElement, id);
    })
    .filter((ge) => ge)?.[0];
};
