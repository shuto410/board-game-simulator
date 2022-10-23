import { atom } from 'recoil';
import Board from '../../components/Board';
import { BOARD_ID } from '../../constants';
import { BoardProperties, GameElement } from '../../type';

export const boardState = atom<GameElement>({
  key: 'boardState',
  default: {
    id: BOARD_ID,
    childElements: [],
    coordinates: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
    Component: Board,
    parent: 'null',
  } as BoardProperties,
});
