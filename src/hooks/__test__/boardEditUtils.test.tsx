import { describe, expect, it } from 'vitest';
import { boardTestData } from './testData';

import {
  findGameElementById,
  attachToGameElementById,
  removeGameElementById,
  updateGameElementById,
  setGameElementProperties,
  isReplaceNecessary,
} from '../boardEditUtils';
import { GameElement } from '../../type';

describe('Test boardEditUtil functions', () => {
  describe('findGameElementById', () => {
    it('should find board itself when that id is passed', () => {
      const result = findGameElementById(boardTestData, boardTestData.id);
      expect(result).toMatchObject(boardTestData);
    });

    it('should find child of board when that id is passed', () => {
      const result = findGameElementById(
        boardTestData,
        boardTestData.childElements![0].id
      );
      expect(result).toMatchObject(boardTestData.childElements![0]);
    });

    it('should throw error when specified id that does not exist', () => {
      const idThatDoesNotExist = 'noexistid';
      expect(() =>
        findGameElementById(boardTestData, idThatDoesNotExist)
      ).toThrow();
    });
  });

  describe('attachToGameElementById', () => {
    it('should attach new game element', () => {
      const newGameElement: GameElement = {
        id: 'newElement',
        coordinates: { x: 0, y: 0 },
        size: { width: 0, height: 0 },
        Component: () => <></>,
      };
      const resultBoard = attachToGameElementById(
        boardTestData,
        newGameElement,
        boardTestData.id
      );
      // parent should be updated
      expect(resultBoard.childElements![1]).toMatchObject({
        ...newGameElement,
        parent: boardTestData.id,
      });
    });
  });

  describe('removeGameElementById', () => {
    it('should remove child element from board', () => {
      const { updatedBoard, removedElement } = removeGameElementById(
        boardTestData,
        boardTestData.childElements![0].id
      );
      expect(removedElement).toMatchObject(boardTestData.childElements![0]);
      expect(updatedBoard.childElements?.length).toBe(0);
    });
  });

  describe('updateGameElementById', () => {
    it('should update board with new game element', () => {
      const newGameElement = {
        ...boardTestData.childElements![0],
        coorinates: { x: 100, y: 100 },
      };
      const updatedBoard = updateGameElementById(
        boardTestData,
        newGameElement,
        newGameElement.id
      );
      expect(updatedBoard.childElements![0]).toMatchObject(newGameElement);
    });
  });

  describe('setGameElementProperties', () => {
    it('should update element properties with the given properties', () => {
      const newGameElement = {
        ...boardTestData.childElements![0],
        coorinates: { x: 100, y: 100 },
      };
      const updatedBoard = setGameElementProperties(
        boardTestData,
        newGameElement.id,
        { ...newGameElement }
      );
      expect(updatedBoard.childElements![0]).toMatchObject(newGameElement);
    });
  });

  describe('isReplaceNecessary', () => {
    it('should return false when parent id is same', () => {
      const result = isReplaceNecessary(
        boardTestData,
        boardTestData.childElements![0].id,
        boardTestData.childElements![0].parent as string
      );
      expect(result).toBe(false);
    });
  });
});
