import { atom } from 'recoil';
import { BOARD_ID } from '../../constants';
import { BoardProperties, GameElement } from '../../type';

export const boardState = atom<GameElement>({
  key: 'boardState',
  default: {
    type: 'BOARD',
    id: BOARD_ID,
    childElements: [],
    coordinates: {
      x: 0,
      y: 0,
    },
    size: {
      width: 800,
      height: 500,
    },
    parentId: 'null',
  } as BoardProperties,
});
